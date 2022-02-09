import { Message } from '../../../API';
import styles from '../../../styles/Message.module.css';
import Purify from 'dompurify';

// export default function MessageBox({ message, isMe }: MessageBoxProps) {
//   return (
//     <div>
//         <p>{ Purify.sanitize(message.message)}</p>
//       </div>
//   );
// }

export default function MessageBox({ message, isMe }: MessageBoxProps) {
  return (
    <div>
      <p className={styles.senderText}>{message.preferredUsername}</p>
      <p className={styles.senderText}>{message.createdAt}</p>
      <div className={isMe ? styles.sendMessage : styles.receivedMessage}>
        <p>{ Purify.sanitize(message.message)}</p>
      </div>
    </div>
  );
}

type MessageBoxProps = {
  message: Message;
  isMe: boolean;
};
