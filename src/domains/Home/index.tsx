import { useEffect, useRef, useState } from 'react';
import { AmplifyAuthenticator, AmplifyInput, AmplifyButton } from '@aws-amplify/ui-react';
import { onAuthUIStateChange, AuthState } from "@aws-amplify/ui-components";
import AppBar from '../../components/AppBar';
import { Grid, TextField } from '@mui/material';
import { Auth } from 'aws-amplify';

const Home = () => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState(null);
  const usernameInput = useRef<HTMLInputElement>();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState: any, authData: any) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  const modifyUsername = async (username: string) => {
    if (usernameInput) {
      const result = await Auth.updateUserAttributes(user, {
        'preferred_username': usernameInput.current?.value
      });
      console.log(result);
    }
  }

  return (<AmplifyAuthenticator>
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12}>
        {authState === AuthState.SignedIn && user ? <AppBar user={user} /> : <div>Loading...</div>}
      </Grid>
      <Grid item xs={6}>
        <Grid item container spacing={3}>
          <Grid item justifyContent="center" xs={12}>
            <TextField id="outlined-basic" defaultValue="generalman" label="Preferred Username" variant="outlined" inputRef={usernameInput}></TextField>
          </Grid>
          <Grid item justifyContent="center" xs={12}>
            <AmplifyButton onClick={() => modifyUsername('Hello')}></AmplifyButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </AmplifyAuthenticator >);
};

export default Home;
