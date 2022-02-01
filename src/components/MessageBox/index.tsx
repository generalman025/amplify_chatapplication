import styles from '../../styles/Message.module.css';

class Message {
    id!: string;
    owner!: string;
    message!: string;
}

interface IProps {
  message: Message,
  isMe: boolean
}

export default function MessageBox({ message, isMe }: IProps) {
    return (
        <div className={isMe ? styles.sentMessageContainer : styles.receivedMessageContainer}>
            <p className={styles.senderText} >{message.owner}</p>
            <div className={isMe ? styles.sendMessage : styles.receivedMessage}>
                <p>{message.message}</p>
            </div>
        </div>
    );
}