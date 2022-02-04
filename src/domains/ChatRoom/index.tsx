import { useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import AppBar from '../../components/AppBar';
import ChatBox from '../../components/ChatBox';
import UserListsBox from '../../components/UserListsBox';
import Alert from '../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { UtilContext } from '../../context/UtilContext';

function ChatRoom() {
  const navigate = useNavigate();
  const { username } = useContext(AuthContext);
  const { severity, alertMessage, showAlert, setShowAlert } =
    useContext(UtilContext);

  // useEffect(() => {
  //   return onAuthUIStateChange((nextAuthState: any) => {
  //     setAuthState(nextAuthState);
  //   });
  // }, []);

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
        <Grid item xs={3} padding={3}>
          <UserListsBox />
        </Grid>
        <Grid item xs={9} padding={3}>
          <ChatBox />
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
