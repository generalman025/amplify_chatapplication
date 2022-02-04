import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import { onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Grid } from '@mui/material';
import AppBar from '../../components/AppBar';
import Alert, { SeverityType } from '../../components/Alert';
import UsernameBox from '../../components/UsernameBox';
import { AuthContext } from '../../context/AuthContext';

const Home = () => {
  const [severity, setSeverity] = useState(SeverityType.success);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  
  const navigate = useNavigate();
  const { setUser, setAuthState } = useContext(AuthContext);

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState: any, authData: any) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
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

  const proceedToChatRoom = () => {
    navigate('/chatroom');
  };

  return (
    <AmplifyAuthenticator>
      <AmplifySignUp
        slot="sign-up"
        formFields={[{ type: 'username' }, { type: 'password' }]}
      />
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <AppBar
            callAlert={callAlert}
          />
        </Grid>
        <Grid margin={5} item xs={3}>
          <UsernameBox
            callAlert={callAlert}
          />
        </Grid>
        <Alert
          showAlert={showAlert}
          alertMessage={alertMessage}
          severity={severity}
          setShowAlert={setShowAlert}
          onSuccess={proceedToChatRoom}
        />
      </Grid>
    </AmplifyAuthenticator>
  );
};

export default Home;
