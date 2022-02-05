import { useContext, useEffect } from 'react';
import { Grid, Paper } from '@mui/material';
import AppBar from '../../components/AppBar';
import ChatBox from '../../components/ChatBox';
import UserListsBox from '../../components/UserListsBox';
import Alert from '../../components/Alert';
import { UtilContext } from '../../context/UtilContext';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ChatRoom() {
  const navigate = useNavigate();
  const { username } = useContext(AuthContext);
  const { severity, alertMessage, showAlert, setShowAlert } =
    useContext(UtilContext);

    useEffect(() => {
      if(!username || username === ''){
        navigate('/');
      }
    }, []);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <AppBar />
      </Grid>
      <Grid container>
        <Grid item xs={3} padding={1}>
          <Paper>
            <UserListsBox />
          </Paper>
        </Grid>
        <Grid item xs={9} padding={1}>
          <Paper>
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

export default ChatRoom;
