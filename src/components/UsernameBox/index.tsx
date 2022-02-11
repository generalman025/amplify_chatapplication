import { useCallback, useContext, useEffect, useState } from 'react';
import Purify from 'dompurify';
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

  const modifyUsername = useCallback(async () => {
    if (!input || input === '') {
      callAlert(
        true,
        'Please input the preferred username',
        SeverityType.error
      );
      return;
    }

    const regexUsername = '[A-Za-z0-9_]{6,20}$';
    const validateUsername = new RegExp(regexUsername);
    if (!validateUsername.test(input) || Purify.sanitize(input) !== input) {
      callAlert(
        true,
        'Username should contains only alphabets, numbers or an underscore and its length should be 6 - 20 characters',
        SeverityType.error
      );
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
  }, [input, user]);

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
