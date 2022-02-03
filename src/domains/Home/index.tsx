import { useEffect, useRef, useState } from 'react';
import { Auth } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import { onAuthUIStateChange, AuthState } from '@aws-amplify/ui-components';
import { CognitoUser } from '@aws-amplify/auth';
import {
  Alert,
  Button,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography
} from '@mui/material';
import AppBar from '../../components/AppBar';
import { IUser } from '../../interfaces/IUser';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [authState, setAuthState] = useState();
  const [input, setInput] = useState('');
  const [user, setUser] = useState<CognitoUser>();
  const [attributes, setAttributes] =
    useState<{ Name: string; Value: string }[]>();
  const [showAlert, setShowAlert] = useState(false);
  const usernameInput = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState: any, authData: any) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  const modifyUsername = async () => {
    if (usernameInput) {
      const result = await Auth.updateUserAttributes(user, {
        preferred_username: input
      });
      setShowAlert(true);
    }
  };

  useEffect(() => {
    if (authState === AuthState.SignedIn && user) {
      user?.getUserAttributes((_error, attrs) => {
        const preferredUsername = attrs?.find(
          (a) => a.Name === 'preferred_username'
        );
        if (preferredUsername) setInput(preferredUsername!.Value);
        setAttributes(attrs);
      });
    }
  }, [user, authState]);

  return (
    <AmplifyAuthenticator>
      <AmplifySignUp
        slot="sign-up"
        formFields={[{ type: 'username' }, { type: 'password' }]}
      />
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          {authState === AuthState.SignedIn && user && attributes ? (
            <AppBar
              {...({
                attributes: attributes,
                username: user.getUsername()
              } as unknown as IUser)}
            />
          ) : (
            <div>Loading...</div>
          )}
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={1}>
            <Grid item container spacing={3}>
              <Grid item justifyContent="center" xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Preferred Username"
                  variant="outlined"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item justifyContent="center" xs={12}>
                <Button variant="contained" onClick={modifyUsername}>
                  <Typography color="common.white">
                    Proceed to Chat Room
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Snackbar
          open={showAlert}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          onClose={(event, reason) => {
            setShowAlert(false);
            navigate('/chatroom');
          }}
        >
          <Alert variant="outlined" severity="success">
            This is a success message!
          </Alert>
        </Snackbar>
      </Grid>
    </AmplifyAuthenticator>
  );
};

export default Home;
