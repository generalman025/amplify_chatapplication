import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import { AuthState } from '@aws-amplify/ui-components';
import { Paper, Grid, TextField, Button, Typography } from '@mui/material';
import { SeverityType } from '../Alert';

type UsernameBoxProps = {
  authState: AuthState;
  user: CognitoUser;
  callAlert: (
    showAlert: boolean,
    alertMessage: string,
    severity: SeverityType
  ) => void;
};

export default function UsernameBox({
  authState,
  user,
  callAlert
}: UsernameBoxProps) {
  const [input, setInput] = useState('');
  const [, setAttributes] =
    useState<{ Name: string; Value: string }[]>();

  const modifyUsername = async () => {
    if (!input || input === '') {
      callAlert(
        true,
        'Please input the preferred username',
        SeverityType.error
      );
      return;
    }

    try {
      await Auth.updateUserAttributes(user, {
        preferred_username: input
      });

      callAlert(true, 'Redirecting to Chat Room...', SeverityType.success);
    }
    catch (error) {
      if (error instanceof Error) callAlert(true, error.message, SeverityType.error);
    }
  };

  useEffect(() => {
    if (authState === AuthState.SignedIn && user) {
      try {
        user?.getUserAttributes((_error, attrs) => {
          const preferredUsername = attrs?.find(
            (a) => a.Name === 'preferred_username'
          );
          if (preferredUsername) setInput(preferredUsername.Value);
          setAttributes(attrs);
        });
      }
      catch (error) {
        if (error instanceof Error) callAlert(true, error.message, SeverityType.error);
      }
    }
  }, [user, authState]);

  return (
    <Paper elevation={2}>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        spacing={3}
        padding={3}
      >
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Preferred Username"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={modifyUsername}>
            <Typography color="common.white">Proceed to Chat Room</Typography>
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
