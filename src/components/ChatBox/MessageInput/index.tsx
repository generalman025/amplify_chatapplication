import styles from '../../../styles/Home.module.css';

type MessageInputProps = {
    message: string;
    setMessage: (message: string) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function MessageInput({ message, setMessage, handleSubmit }: MessageInputProps) {
    return (
        <form onSubmit={handleSubmit} className={styles.formBase}>
            <input
                type="text"
                id="message"
                autoFocus
                required
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Type your message here..."
                className={styles.textBox}
            />
            <button style={{ marginLeft: '8px' }}>Send</button>
        </form>
    );
}