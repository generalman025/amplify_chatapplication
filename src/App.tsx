import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ChatRoom from './domains/ChatRoom';
import Home from './domains/Home';
import RequireAuth from './utils/RequireAuth';
import { AuthContextProvider } from './context/AuthContext';
import { UtilContextProvider } from './context/UtilContext';
import NotFound from './domains/404';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF9900'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <UtilContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<RequireAuth />}>
              <Route path="/chatroom" element={<ChatRoom />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UtilContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
