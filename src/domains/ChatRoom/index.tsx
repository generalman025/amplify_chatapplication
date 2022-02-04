import { useEffect, useState } from 'react';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { Grid } from '@mui/material';
import { onAuthUIStateChange, AuthState } from '@aws-amplify/ui-components';
import { CognitoUser } from '@aws-amplify/auth';
import AppBar from '../../components/AppBar';
import ChatBox from '../../components/ChatBox';
import UserListsBox from '../../components/UserListsBox';
import Alert, { SeverityType } from '../../components/Alert';

export default function ChatRoom() {
  const [authState, setAuthState] = useState<AuthState>(AuthState.Loading);
  const [user, setUser] = useState<CognitoUser>();

  const [severity, setSeverity] = useState(SeverityType.success);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState: any,) => {
      setAuthState(nextAuthState);
    });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const amplifyUser = await Auth.currentAuthenticatedUser();
        setUser(amplifyUser);
      } catch (error) {
        if (error instanceof Error) callAlert(true, error.message, SeverityType.error);
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
    <AmplifyAuthenticator>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <AppBar authState={authState} user={user as unknown as CognitoUser} callAlert={callAlert} />
        </Grid>
        <Grid container>
          <Grid item xs={3} padding={3}>
            <UserListsBox user={user!} callAlert={callAlert} />
          </Grid>
          <Grid item xs={9} padding={3}>
            <ChatBox user={user!} callAlert={callAlert} />
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
    </AmplifyAuthenticator>
  );
}
