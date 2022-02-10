import { useCallback, useContext, useEffect, useState } from 'react';
import Purify from 'dompurify';
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
import ScrollableFeed from 'react-scrollable-feed';

import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";

import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

import appSyncConfig from "../../aws-exports";
import { AuthOptions } from '@aws-amplify/auth/lib-esm/types';

const url = appSyncConfig.aws_appsync_graphqlEndpoint;
const region = appSyncConfig.aws_appsync_region;
const auth: AuthOptions = {
  authenticationFlowType: appSyncConfig.aws_appsync_authenticationType,
  userPoolId: appSyncConfig.aws_cognito_identity_pool_id
};

// const httpLink = createHttpLink({ uri: url });
// const link = ApolloLink.from([
//   createAuthLink({url, region, (auth as AuthOptions)}),
//   createSubscriptionHandshakeLink({url, region, auth} httpLink)
// ]);

// const link = ApolloLink.from([
//   createAuthLink({ url, region, auth }),
//   createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
// ]);

// const client = new ApolloClient({
//   link,
//   cache: new InMemoryCache(),
// });

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
      } catch (_) {
        callAlert(true, 'Something went wrong!!!', SeverityType.error);
      }
    };

    getMessages();

    // Need to fix subscription feature for local simulation, issue: https://github.com/aws-amplify/amplify-cli/issues/9621
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
        error: () => {
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

      if (Purify.sanitize(message) !== message) {
        callAlert(true, 'Please input a correct message', SeverityType.error);
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
        } catch (_) {
          callAlert(true, 'Something went wrong!!!', SeverityType.error);
        }
      }
    },
    [user, username, message]
  );

  return (
    <Grid style={{maxHeight: "78vh", margin: 10}} data-testid="chatbox">
      <ScrollableFeed>
        {messages
          .sort((prev: Message, next: Message) =>
          prev.createdAt.localeCompare(next.createdAt)
          )
          .map((msg) => (
            <MessageBox
              message={msg}
              isMe={user?.getUsername() === msg.owner}
              key={msg.id}
            />
          ))}
      </ScrollableFeed>
      <MessageInput
          message={message}
          setMessage={setMessage}
          handleSubmit={handleSubmit}
        />
    </Grid>
  );
}
