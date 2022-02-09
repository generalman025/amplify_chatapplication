import { useCallback, useContext, useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createMessage } from '../../graphql/mutations';
import { listMessages } from '../../graphql/queries';
import { onCreateMessage } from '../../graphql/subscriptions';
import {
  ListMessagesQuery,
  Message,
  OnCreateMessageSubscription
} from '../../API';
import Observable from 'zen-observable-ts';
import MessageInput from './MessageInput';
import MessageBox from './MessageBox';
import { SeverityType } from '../Alert';
import { AuthContext } from '../../context/AuthContext';
import { UtilContext } from '../../context/UtilContext';
import { Grid } from '@mui/material';
import styles from '../../styles/Message.module.css';
import Purify from 'dompurify';

export default function ChatBox() {
  const [messages, setMessages] = useState(Array<Message>());
  const [message, setMessage] = useState('');
  const { user, username } = useContext(AuthContext);
  const { callAlert } = useContext(UtilContext);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const messageReq = (await API.graphql(
          graphqlOperation(listMessages)
        )) as { data: ListMessagesQuery };
        setMessages([...(messageReq.data.listMessages?.items as Message[])]);
      } catch (error) {
        if (error instanceof Error)
          callAlert(true, error.message, SeverityType.error);
      }
    };

    getMessages();

    // TODO: Need to fix subscription feature for local simulation, issue: https://github.com/aws-amplify/amplify-cli/issues/9621
    const subscription = API.graphql(graphqlOperation(onCreateMessage));
    let unsubscribe;
    if (subscription instanceof Observable) {
      const sub = subscription.subscribe({
        next: (response: { value: { data: OnCreateMessageSubscription } }) => {
          setMessages((msgs) => [
            ...msgs,
            response.value.data.onCreateMessage as Message
          ]);
        },
        error: (error) => {
          callAlert(true, 'Something went wrong!!!', SeverityType.error);
        }
      });

      unsubscribe = () => {
        sub.unsubscribe();
      };
    }
    return unsubscribe;
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setMessage('');

      if(Purify.sanitize(message) !== message) {
        callAlert(true, 'Please input the correct message', SeverityType.error);
        return;
      }

      if (user) {
        const input = {
          message,
          owner: user.getUsername(),
          preferredUsername: username
        };

        try {
          await API.graphql(graphqlOperation(createMessage, { input }));
        } catch (error) {
          callAlert(true, 'Something went wrong!!!', SeverityType.error);
        }
      }
    },
    [user, username, message]
  );

  return (
    <Grid container>
      <div data-test="chatbox" className={styles.chatbox}>
        {messages
          .sort((prev: Message, next: Message) =>
            next.createdAt.localeCompare(prev.createdAt)
          )
          .map((msg) => (
            <MessageBox
              message={msg}
              isMe={user?.getUsername() === msg.owner}
              key={msg.id}
            />
          ))}
      </div>
      <div className={styles.formContainer}>
        <MessageInput
          message={message}
          setMessage={setMessage}
          handleSubmit={handleSubmit}
        />
      </div>
    </Grid>
  );
}
