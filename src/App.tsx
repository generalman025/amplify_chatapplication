import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import createTheme from '@mui/material/styles/createTheme';
import ChatRoom from './domains/ChatRoom';
import Home from './domains/Home';
import RequireAuth from './utils/RequireAuth';
import { useState } from 'react';
import { AuthState } from '@aws-amplify/ui-components';
import { AuthContext } from './context/AuthContext';
import { UtilContext } from './context/UtilContext';
import { CognitoUser } from '@aws-amplify/auth';
import { SeverityType } from './components/Alert';
import NotFound from './domains/404';

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
  const [severity, setSeverity] = useState(SeverityType.success);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const callAlert = (
    showAlertParam: boolean,
    alertMessageParam: string,
    severityParam: SeverityType
  ) => {
    setShowAlert(showAlertParam);
    setAlertMessage(alertMessageParam);
    setSeverity(severityParam);
  };

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider
        value={{
          user,
          username,
          authState,
          setUser,
          setUsername,
          setAuthState
        }}
      >
        <UtilContext.Provider
          value={{
            severity,
            alertMessage,
            showAlert,
            setSeverity,
            setAlertMessage,
            setShowAlert,
            callAlert
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<RequireAuth />}>
              <Route path="/chatroom" element={<ChatRoom />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UtilContext.Provider>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
