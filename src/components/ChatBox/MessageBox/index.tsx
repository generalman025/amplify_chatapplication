import { Message } from '../../../API';
import styles from '../../../styles/ChatBox.module.css';
import Purify from 'dompurify';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useCallback } from 'react';

export default function MessageBox({ message, isMe }: MessageBoxProps) {
  const dateFormat = useCallback((str: string) => {
    dayjs.extend(relativeTime);
    const date = dayjs(str);
    if (dayjs().diff(date, 'day', true) <= 1) return date.fromNow();
    else return date.format('MMM D, YYYY');
  }, []);

  return (
    <div
      style={
        isMe
          ? {
              display: 'flex',
              flexDirection: 'row-reverse',
              textAlign: 'right'
            }
          : {}
      }
    >
      <div>
        <p className={styles.senderUsernameText} style={{ fontSize: 'larger' }}>
          {isMe ? 'You' : Purify.sanitize(message.preferredUsername)}
        </p>
        <p className={styles.senderText}>{dateFormat(message.createdAt)}</p>
        <div className={isMe ? styles.sendMessage : styles.receivedMessage}>
          <p>{Purify.sanitize(message.message)}</p>
        </div>
      </div>
    </div>
  );
}

type MessageBoxProps = {
  message: Message;
  isMe: boolean;
};
