import { useContext, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { AuthState } from '@aws-amplify/ui-components';
import { Paper, Grid, TextField, Button, Typography } from '@mui/material';
import { SeverityType } from '../Alert';
import { AuthContext } from '../../context/AuthContext';
import { UtilContext } from '../../context/UtilContext';

export default function UsernameBox() {
  const [input, setInput] = useState('');
  const { user, authState, setUsername } = useContext(AuthContext);
  const { callAlert } = useContext(UtilContext);

  const modifyUsername = async () => {
    if (!input || input === '') {
      callAlert(
        true,
        'Please input the preferred username',
        SeverityType.error
      );
      return;
    }

    const regexUsername = '^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$';
    const validateUsername = new RegExp(regexUsername);
    if(!validateUsername.test(input)){
      callAlert(true, 'Please input a correct username', SeverityType.error);
      return;
    }

    try {
      await Auth.updateUserAttributes(user, {
        preferred_username: input
      });
      setUsername(input);

      callAlert(true, 'Redirecting to Chat Room...', SeverityType.success);
    } catch (_) {
      callAlert(true, 'Something went wrong!!!', SeverityType.error);
    }
  };

  useEffect(() => {
    if (authState === AuthState.SignedIn && user) {
      try {
        user.getUserAttributes((_error, attrs) => {
          const preferredUsername = attrs?.find(
            (a) => a.Name === 'preferred_username'
          );
          if (preferredUsername) setInput(preferredUsername.Value);
        });
      } catch (_) {
        callAlert(true, 'Something went wrong!!!', SeverityType.error);
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
            id="preferredUsername"
            data-testid="preferredUsername"
            label="Preferred Username"
            variant="outlined"
            value={input}
            inputProps={{ maxLength: 20 }}
            onChange={(e) => setInput(e.target.value)}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <Button
            id="changeUsernameButton"
            variant="contained"
            onClick={modifyUsername}
          >
            <Typography color="common.white">Proceed to Chat Room</Typography>
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
