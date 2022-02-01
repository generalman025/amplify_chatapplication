import React, {useEffect, useState} from 'react';
import {Auth, API, graphqlOperation} from 'aws-amplify';
// import { OnCreateMessageSubscription } from '../../API';
import { Observable } from 'zen-observable-ts';
import { onCreateMessage } from '../../graphql/subscriptions';
import { listMessages } from '../../graphql/queries';
import { createMessage } from '../../graphql/mutations';
import { withAuthenticator } from '@aws-amplify/ui-react';
import styles from '../../styles/Home.module.css';
import MessageBox from '../../components/MessageBox';

class Message {
    id!: string;
    owner!: string;
    message!: string;
}

function Home() {
    const [stateMessages, setStateMessages] = useState(Array<Message>());
    const [messageText, setMessageText] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try{
                const amplifyUser = await Auth.currentAuthenticatedUser();
                setUser(amplifyUser);
            }catch(err){
                setUser(null);
            }
        }
        
        fetchUser();

        const subscription = API.graphql(graphqlOperation(onCreateMessage)) as Observable<object>;
        if(subscription instanceof Observable){
            console.log('subscribed');
            const a = subscription.subscribe({
                next: ({value}: any) => {
                    console.log('payload', JSON.stringify(value));
                    setStateMessages((stateMessages) => [...stateMessages, value.data.onCreateMessage]);
                },
                error: (error) => console.warn(error),
            });
            console.log(a);
        }
    }, []);

    useEffect(() => {
        async function getMessages(){
            try {
                const messageReq: any = await API.graphql({
                    query: listMessages,
                    authMode: 'AMAZON_COGNITO_USER_POOLS',
                });
                setStateMessages([...messageReq.data.listMessages.items]);
            }catch(error){
                console.log(error);
            }
        }
        getMessages();
    }, [user]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setMessageText("");

        if(user){
            const input = {
                message: messageText,
                owner: (user as any).username,
            };
    
            try {
                await API.graphql({
                    authMode: 'AMAZON_COGNITO_USER_POOLS',
                    query: createMessage,
                    variables: { input },
                });
            }catch(error){
                console.error(error);
            }
        }
    };

    if(user){
        return (
            <div className={styles.background}>
                <div className={styles.container}>
                    <h1 className={styles.title}>AWS Amplify Live Chat</h1>
                    <div className={styles.chatbox}>
                        {
                            stateMessages.sort((a: any,b: any) => b.createdAt.localeCompare(a.createdAt))
                            .map(message => 
                                <MessageBox 
                                message={message} 
                                isMe={(user as any).username === message.owner} 
                                key={message.id}/>
                            )
                        }
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
                            <button style={{marginLeft: "8px"}}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }else{
        return <div>Loading...</div>;
    }
}

export default withAuthenticator(Home);