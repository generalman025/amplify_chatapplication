import { ThemeProvider } from '@mui/material/styles';
import createTheme from '@mui/material/styles/createTheme';
import { Route, Routes } from 'react-router-dom';
import ChatRoom from './domains/ChatRoom';
import Home from './domains/Home';

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
        <Route path="/chatroom" element={<ChatRoom />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
