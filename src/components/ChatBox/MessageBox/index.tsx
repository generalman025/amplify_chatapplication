import { IMessage } from '../../../interfaces/IMessage';
import styles from '../../../styles/Message.module.css';

export default function MessageBox({ message, isMe }: IMessage) {
  return (
    <div
      className={
        isMe ? styles.sentMessageContainer : styles.receivedMessageContainer
      }
    >
      <p className={styles.senderText}>{message.preferredUsername}</p>
      <p className={styles.senderText}>{message.createdAt}</p>
      <div className={isMe ? styles.sendMessage : styles.receivedMessage}>
        <p>{message.message}</p>
      </div>
    </div>
  );
}
