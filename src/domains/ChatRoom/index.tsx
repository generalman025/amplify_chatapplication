import { useContext, useEffect, useState } from 'react';
import { Grid, Paper } from '@mui/material';
import AppBar from '../../components/AppBar';
import ChatBox from '../../components/ChatBox';
import UserListsBox from '../../components/UserListsBox';
import Alert from '../../components/Alert';
import { UtilContext } from '../../context/UtilContext';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export default function ChatRoom() {
  const navigate = useNavigate();
  const { username } = useContext(AuthContext);
  const { severity, alertMessage, showAlert, setShowAlert } =
    useContext(UtilContext);
  const [datetime, setDatetime] = useState('');

  useEffect(() => {
    if (!username || username === '') {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDatetime(dayjs().format());
    }, 30000);
    return () => clearInterval(interval)
  }, [datetime]);

  return (
    <Grid container justifyContent="center" maxHeight="100vh">
      <Grid item xs={12}>
        <AppBar />
      </Grid>
      <Grid container maxHeight="80vh">
        <Grid item xs={3}>
          <Paper style={{ width: "fit-content", margin: 10 }}>
            <UserListsBox />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper style={{ margin: 10 }}>
            <ChatBox />
          </Paper>
        </Grid>
      </Grid>
      <Alert
        showAlert={showAlert}
        alertMessage={alertMessage}
        severity={severity}
        setShowAlert={setShowAlert}
        onSuccess={() => true}
      />
    </Grid>
  );
}
