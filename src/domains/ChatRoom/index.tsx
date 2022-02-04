import { useContext, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { Grid } from '@mui/material';
import { onAuthUIStateChange } from '@aws-amplify/ui-components';
import { CognitoUser } from '@aws-amplify/auth';
import AppBar from '../../components/AppBar';
import ChatBox from '../../components/ChatBox';
import UserListsBox from '../../components/UserListsBox';
import Alert, { SeverityType } from '../../components/Alert';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function ChatRoom() {
  const navigate = useNavigate();
  const {setAuthState, setUser} = useContext(AuthContext);

  const [severity, setSeverity] = useState(SeverityType.success);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState: any) => {
      setAuthState(nextAuthState);
    });
  }, []);

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const amplifyUser = await Auth.currentAuthenticatedUser() as CognitoUser;
        amplifyUser.getUserAttributes((_error, attrs) => {
          const preferredUsername = attrs?.find(
            (a) => a.Name === 'preferred_username'
          );
          if (preferredUsername) setUser(amplifyUser);
          else navigate('/');
        });
        setUser(amplifyUser);
      } catch (error) {
        if (error instanceof Error)
          callAlert(true, error.message, SeverityType.error);
          navigate('/');
      }
    };

    fetchUser();
  }, []);

  const callAlert = (
    showAlert: boolean,
    alertMessage: string,
    severity: SeverityType
  ) => {
    setShowAlert(showAlert);
    setAlertMessage(alertMessage);
    setSeverity(severity);
  };

  return (
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <AppBar
            callAlert={callAlert}
          />
        </Grid>
        <Grid container>
          <Grid item xs={3} padding={3}>
            <UserListsBox callAlert={callAlert} />
          </Grid>
          <Grid item xs={9} padding={3}>
            <ChatBox callAlert={callAlert} />
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
