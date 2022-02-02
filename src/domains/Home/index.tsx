import React, {useEffect, useState} from 'react';
import { Observable } from 'zen-observable-ts';
import { withAuthenticator } from '@aws-amplify/ui-react';
import {Auth, API, graphqlOperation} from 'aws-amplify';
import { ListMessagesQuery, Message, OnCreateMessageSubscription } from '../../API';
import { onCreateMessage } from '../../graphql/subscriptions';
import { listMessages } from '../../graphql/queries';
import { createMessage } from '../../graphql/mutations';
import MessageBox from '../../components/MessageBox';
import styles from '../../styles/Home.module.css';

function Home() {
    const [stateMessages, setStateMessages] = useState(Array<Message>());
    const [messageText, setMessageText] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try{
                const amplifyUser = (await Auth.currentAuthenticatedUser());
                setUser(amplifyUser); 
            }catch(err){
                setUser(null);
            }
        }
        
        fetchUser();

        const subscription = API.graphql(graphqlOperation(onCreateMessage)) as Observable<object>;
        if(subscription instanceof Observable){
            subscription.subscribe({
                next: (value: {data: OnCreateMessageSubscription}) => {
                    console.log(JSON.stringify(value));
                    // setStateMessages((stateMessages) => [...stateMessages, value.data.onCreateMessage as Message]);
                },
                error: (error) => console.warn(error),
            });
        }
    }, []);

    useEffect(() => {
        async function getMessages(){
            try {
                const messageReq = await API.graphql(graphqlOperation(listMessages)) as {data: ListMessagesQuery};
                setStateMessages([...(messageReq.data.listMessages?.items as Message[])]);
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
                await API.graphql(graphqlOperation(createMessage, { input }));
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
                            stateMessages.sort((a: Message,b: Message) => b.createdAt.localeCompare(a.createdAt))
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