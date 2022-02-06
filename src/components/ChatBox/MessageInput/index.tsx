import { Button, TextField } from '@mui/material';
import { Send } from '@mui/icons-material';
import styles from '../../../styles/Home.module.css';

type MessageInputProps = {
  message: string;
  setMessage: (message: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function MessageInput({
  message,
  setMessage,
  handleSubmit
}: MessageInputProps) {
  return (
    <form onSubmit={handleSubmit} className={styles.formBase}>
      <TextField
        id="messageInput"
        variant="outlined"
        required
        autoFocus
        value={message}
        placeholder="Type your message here..."
        onChange={(e) => setMessage(e.target.value)}
        fullWidth={true}
        style={{ padding: '5px' }}
      ></TextField>
      <Button
        id="sendMessage"
        style={{ marginLeft: '8px' }}
        type="submit"
        variant="contained"
        endIcon={<Send />}
      >
        Send
      </Button>
    </form>
  );
}
