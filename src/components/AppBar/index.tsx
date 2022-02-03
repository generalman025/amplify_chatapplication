import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Auth } from 'aws-amplify';
import { IUser } from '../../interfaces/IUser';

export default function ButtonAppBar(user: IUser) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {`Hello, ${user.attributes.find(a => a.Name === "preferred_username")?.Value}`}
          </Typography>
          <Button color="inherit" onClick={() => { Auth.signOut(); }}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}