import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import createTheme from '@mui/material/styles/createTheme';
import ChatRoom from './domains/ChatRoom';
import Home from './domains/Home';
import RequireAuth from './utils/RequireAuth';

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<RequireAuth />}>
          <Route path="/chatroom" element={<ChatRoom />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
