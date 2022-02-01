import './App.css';

import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator } from '@aws-amplify/ui-react'
import Home from './domains/Home';

function App(){
  return <Home />
}

export default withAuthenticator(App)
