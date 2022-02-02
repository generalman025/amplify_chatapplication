import './App.css';

import '@aws-amplify/ui-react/styles.css';
import { AmplifyProvider } from '@aws-amplify/ui-react';
import Home from './domains/Home';
import ChatRoom from './domains/ChatRoom';

function App() {
  return (
    <AmplifyProvider>
      <Home />
    </AmplifyProvider>
  );
}

export default App;
