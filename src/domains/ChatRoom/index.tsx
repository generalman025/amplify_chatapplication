import React, { useEffect, useState } from 'react';
import { Observable } from 'zen-observable-ts';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import {
  ListMessagesQuery,
  Message,
  OnCreateMessageSubscription
} from '../../API';
import { onCreateMessage } from '../../graphql/subscriptions';
import { listMessages } from '../../graphql/queries';
import { createMessage } from '../../graphql/mutations';
import MessageBox from '../../components/MessageBox';
import styles from '../../styles/Home.module.css';
import { Grid } from '@mui/material';
import { onAuthUIStateChange, AuthState } from '@aws-amplify/ui-components';
import { CognitoUser } from '@aws-amplify/auth';
import AppBar from '../../components/AppBar';
import { IUser } from '../../interfaces/IUser';

function ChatRoom() {
  const [stateMessages, setStateMessages] = useState(Array<Message>());
  const [attributes, setAttributes] =
    useState<{ Name: string; Value: string }[]>();
  const [messageText, setMessageText] = useState('');
  const [user, setUser] = useState<CognitoUser>();
  const [authState, setAuthState] = useState();
  const [allUsers, setAllUsers] = useState<CognitoUser[]>();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState: any, authData: any) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const amplifyUser = await Auth.currentAuthenticatedUser();
        setUser(amplifyUser);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();

    const fetchAllUsers = async () => {
      try {
        const users = (await API.get(
          'listUsersApi',
          '/users',
          {}
        )) as CognitoUser[];
        setAllUsers(users);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllUsers();

    const subscription = API.graphql(
      graphqlOperation(onCreateMessage)
    ) as Observable<object>;
    let unsubscribe;

    if (subscription instanceof Observable) {
      const sub = subscription.subscribe({
        next: (response: { value: { data: OnCreateMessageSubscription } }) => {
          setStateMessages((stateMessages) => [
            ...stateMessages,
            response.value.data.onCreateMessage as Message
          ]);
        },
        error: (error) => console.warn(error)
      });

      unsubscribe = () => {
        sub.unsubscribe();
      };
    }
    return unsubscribe;
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const messageReq = (await API.graphql(
          graphqlOperation(listMessages)
        )) as { data: ListMessagesQuery };
        setStateMessages([
          ...(messageReq.data.listMessages?.items as Message[])
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    getMessages();
  }, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessageText('');

    if (user) {
      const input = {
        message: messageText,
        owner: (user as any).username,
        preferredUsername: (user as any).attributes.preferred_username
      };

      try {
        await API.graphql(graphqlOperation(createMessage, { input }));
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    console.log(allUsers);
  }, [allUsers]);

  useEffect(() => {
    if (authState === AuthState.SignedIn && user) {
      user?.getUserAttributes((_error, attrs) => {
        setAttributes(attrs);
      });
    }
  }, [user, authState]);

  if (user) {
    return (
      <AmplifyAuthenticator>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            {authState === AuthState.SignedIn && user && attributes ? (
              <AppBar
                {...({
                  attributes: attributes,
                  username: user.getUsername()
                } as unknown as IUser)}
              />
            ) : (
              <div>Loading...</div>
            )}
          </Grid>
          <Grid item xs={12}>
            <div className={styles.background}>
              <div className={styles.container}>
                <div className={styles.chatbox}>
                  {stateMessages
                    .sort((a: Message, b: Message) =>
                      b.createdAt.localeCompare(a.createdAt)
                    )
                    .map((message) => (
                      <MessageBox
                        message={message}
                        isMe={(user as any).username === message.owner}
                        key={message.id}
                      />
                    ))}
                </div>
                <div className={styles.formContainer}>
                  <form onSubmit={handleSubmit} className={styles.formBase}>
                    <input
                      type="text"
                      id="message"
                      autoFocus
                      required
                      value={messageText}
                      onChange={(event) => setMessageText(event.target.value)}
                      placeholder="Type your message here..."
                      className={styles.textBox}
                    />
                    <button style={{ marginLeft: '8px' }}>Send</button>
                  </form>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </AmplifyAuthenticator>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default ChatRoom;
