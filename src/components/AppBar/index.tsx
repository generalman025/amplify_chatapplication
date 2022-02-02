// import { AmplifyGreetings } from '@aws-amplify/ui-react';

// function AppBar(user: any) {
//   return (<AmplifyGreetings username={user.user.attributes.preferred_username} />);
// }

// export default AppBar;

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Auth } from 'aws-amplify';

export default function ButtonAppBar(user: any) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {`Hello, ${user.user.attributes.preferred_username}`}
          </Typography>
          <Button color="inherit" onClick={() => { Auth.signOut(); }}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}