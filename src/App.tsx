import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import createTheme from '@mui/material/styles/createTheme';
import ChatRoom from './domains/ChatRoom';
import Home from './domains/Home';
import RequireAuth from './utils/RequireAuth';
import { useState } from 'react';
import { AuthState } from '@aws-amplify/ui-components';
import { AuthContext } from './context/AuthContext';
import { CognitoUser } from '@aws-amplify/auth';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF9900'
    }
  }
});

function App() {
  const [user, setUser] = useState<CognitoUser | null>(null);
  const [username, setUsername] = useState('');
  const [authState, setAuthState] = useState<AuthState>(AuthState.Loading);

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={{
        user,
        username,
        authState,
        setUser,
        setUsername,
        setAuthState
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<RequireAuth />}>
            <Route path="/chatroom" element={<ChatRoom />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
