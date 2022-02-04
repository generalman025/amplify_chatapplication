import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import { createMessage } from '../../graphql/mutations';
import { listMessages } from '../../graphql/queries';
import { onCreateMessage } from '../../graphql/subscriptions';
import { ListMessagesQuery, Message, OnCreateMessageSubscription } from '../../API';
import Observable from 'zen-observable-ts';
import MessageInput from './MessageInput';
import MessageBox from './MessageBox';
import { SeverityType } from '../Alert';
import styles from '../../styles/Home.module.css';

type ChatBoxProps = {
    user: CognitoUser;
    callAlert: (showAlert: boolean, alertMessage: string, severity: SeverityType) => void;
};

export default function ChatBox({ user, callAlert }: ChatBoxProps) {
    const [messages, setMessages] = useState(Array<Message>());
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getMessages = async () => {
            try {
                const messageReq = (await API.graphql(
                    graphqlOperation(listMessages)
                )) as { data: ListMessagesQuery };
                setMessages([
                    ...(messageReq.data.listMessages?.items as Message[])
                ]);
            } catch (error) {
                if (error instanceof Error) callAlert(true, error.message, SeverityType.error);
            }
        };

        getMessages();

        const subscription = API.graphql(
            graphqlOperation(onCreateMessage)
        ) as Observable<object>;
        let unsubscribe;
        if (subscription instanceof Observable) {
            const sub = subscription.subscribe({
                next: (response: { value: { data: OnCreateMessageSubscription } }) => {
                    setMessages((messages) => [
                        ...messages,
                        response.value.data.onCreateMessage as Message
                    ]);
                },
                error: (error) => {
                    if (error instanceof Error) callAlert(true, error.message, SeverityType.error);
                }
            });

            unsubscribe = () => {
                sub.unsubscribe();
            };
        }
        return unsubscribe;
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage('');

        if (user) {
            const input = {
                message,
                owner: (user as any).username,
                preferredUsername: (user as any).attributes.preferred_username
            };

            try {
                await API.graphql(graphqlOperation(createMessage, { input }));
            } catch (error) {
                if (error instanceof Error) callAlert(true, error.message, SeverityType.error);
            }
        }
    };

    return (
        <div>
            <div>
                <div className={styles.chatbox}>
                    {messages
                        .sort((prev: Message, next: Message) =>
                            next.createdAt.localeCompare(prev.createdAt)
                        )
                        .map((msg) => (
                            <MessageBox
                                message={msg}
                                isMe={(user as any).username === msg.owner}
                                key={msg.id}
                            />
                        ))}
                </div>
                <div className={styles.formContainer}>
                    <MessageInput message={message} setMessage={setMessage} handleSubmit={handleSubmit} />
                </div>
            </div>
        </div>
    );
}