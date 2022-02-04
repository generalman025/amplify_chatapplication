import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { AuthState } from '@aws-amplify/ui-components';
import { AppBar as MuiAppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { SeverityType } from '../Alert';
import { AuthContext } from '../../context/AuthContext';

type AppBarProps = {
  callAlert: (
    showAlert: boolean,
    alertMessage: string,
    severity: SeverityType
  ) => void;
};

export default function AppBar({ callAlert }: AppBarProps) {
  const navigate = useNavigate();
  const [attributes, setAttributes] =
    useState<{ Name: string; Value: string }[]>();
  const { user, authState } = useContext(AuthContext);

  const handleLogout = async () => {
    await Auth.signOut();
    navigate('/');
  };

  useEffect(() => {
    if (authState === AuthState.SignedIn && user) {
      try {
        user?.getUserAttributes((_error, attrs) => {
          setAttributes(attrs);
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
            {authState === AuthState.SignedIn && user && attributes
              ? `Hello, ${
                  attributes.find((a) => a.Name === 'preferred_username')?.Value
                }`
              : ''}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            <Typography color="common.white">Logout</Typography>
          </Button>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
