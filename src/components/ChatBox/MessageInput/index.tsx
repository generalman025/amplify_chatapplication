import { Button, TextField } from '@mui/material';
import { Send } from '@mui/icons-material';
import styles from '../../../styles/ChatBox.module.css';

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
        style={{ paddingTop: '20px' }}
        inputProps={{ maxLength: 200 }}
      ></TextField>
      <Button
        id="sendMessage"
        style={{ marginLeft: '8px', marginTop: '12px' }}
        type="submit"
        variant="contained"
        size="large"
        endIcon={<Send />}
      >
        Send
      </Button>
    </form>
  );
}

type MessageInputProps = {
  message: string;
  setMessage: (message: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};
