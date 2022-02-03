import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IUser } from '../../interfaces/IUser';

export default function ButtonAppBar(user: IUser) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await Auth.signOut();
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            color="common.white"
            sx={{ flexGrow: 1 }}
          >
            {`Hello, ${
              user.attributes.find((a) => a.Name === 'preferred_username')
                ?.Value
            }`}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            <Typography color="common.white">Logout</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
