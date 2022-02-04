import { useNavigate } from 'react-router-dom';
import { useCallback, useContext, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { AuthState } from '@aws-amplify/ui-components';
import { AppBar as MuiAppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { SeverityType } from '../Alert';
import { AuthContext } from '../../context/AuthContext';
import { UtilContext } from '../../context/UtilContext';

export default function AppBar() {
  const navigate = useNavigate();
  const { user, authState, username, setUsername } = useContext(AuthContext);
  const { callAlert } = useContext(UtilContext);

  const handleLogout = useCallback(async () => {
    await Auth.signOut();
    navigate('/');
  }, []);

  useEffect(() => {
    if (authState === AuthState.SignedIn && user) {
      try {
        user?.getUserAttributes((_error, attrs) => {
          if (attrs) {
            const attribute = attrs.find((attr) => attr.Name === 'preferred_username');
            if (attribute) {
              setUsername(attribute.Value)
            }
          }
        });
      } catch (error) {
        if (error instanceof Error)
          callAlert(true, error.message, SeverityType.error);
      }
    }
  }, [user, authState]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            color="common.white"
            sx={{ flexGrow: 1 }}
          >
            {authState === AuthState.SignedIn && user && username
              ? `Hello, ${username}`
              : ''}
          </Typography>
          <Button type='submit' onClick={() => handleLogout()} color="inherit">
            <Typography color="common.white">Logout</Typography>
          </Button>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
