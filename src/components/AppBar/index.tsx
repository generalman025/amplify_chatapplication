import { useNavigate } from 'react-router-dom';
import { useCallback, useContext, useEffect } from 'react';
import Purify from 'dompurify';
import { Auth } from 'aws-amplify';
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
  const { user, username, setUsername } = useContext(AuthContext);
  const { callAlert } = useContext(UtilContext);

  const handleLogout = useCallback(async () => {
    await Auth.signOut();
    navigate('/');
  }, []);

  useEffect(() => {
    if (user) {
      try {
        user.getUserAttributes((_error, attrs) => {
          if (attrs) {
            const attribute = attrs.find(
              (attr) => attr.Name === 'preferred_username'
            );
            if (attribute) {
              setUsername(attribute.Value);
            }
          }
        });
      } catch (_) {
        callAlert(true, 'Something went wrong!!!', SeverityType.error);
      }
    }
  }, [user]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar data-testid="appbar" position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            color="common.white"
            sx={{ flexGrow: 1 }}
          >
            {user && username ? `Hello, ${Purify.sanitize(username)}` : ''}
          </Typography>
          <Button
            id="logoutButton"
            type="submit"
            onClick={() => handleLogout()}
            color="inherit"
            data-testid="logout"
          >
            <Typography color="common.white">Logout</Typography>
          </Button>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
