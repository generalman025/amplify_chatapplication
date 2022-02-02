import { Route, Routes } from 'react-router-dom';
import ChatRoom from './domains/ChatRoom';
import Home from './domains/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/ChatRoom" element={<ChatRoom/>} />
    </Routes>
  );
}

export default App;
