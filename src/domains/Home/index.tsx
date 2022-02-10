import { useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUser } from '@aws-amplify/auth';
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import { onAuthUIStateChange, AuthState } from '@aws-amplify/ui-components';
import { Grid } from '@mui/material';
import AppBar from '../../components/AppBar';
import Alert from '../../components/Alert';
import UsernameBox from '../../components/UsernameBox';
import { AuthContext } from '../../context/AuthContext';
import { UtilContext } from '../../context/UtilContext';

const Home = () => {
  const navigate = useNavigate();
  const { setUser, setAuthState } = useContext(AuthContext);
  const { severity, alertMessage, showAlert, setShowAlert } =
    useContext(UtilContext);

  useEffect(() => {
    return onAuthUIStateChange(
      (nextAuthState: AuthState, authData: object | undefined) => {
        setAuthState(nextAuthState);
        if (authData) setUser(authData as CognitoUser);
      }
    );
  }, []);

  const proceedToChatRoom = useCallback(() => {
    navigate('/chatroom');
  },[]);

  return (
    <AmplifyAuthenticator>
      <AmplifySignUp
        slot="sign-up"
        formFields={[{ type: 'username' }, { type: 'password' }]}
      />
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <AppBar />
        </Grid>
        <Grid margin={5} item xs={12} style={{flexBasis: 'fit-content'}}>
          <UsernameBox />
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
