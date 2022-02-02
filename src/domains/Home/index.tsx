import { useEffect, useState } from 'react';
import { AmplifyAuthenticator, AmplifyInput, AmplifyButton } from '@aws-amplify/ui-react';
import { onAuthUIStateChange, AuthState } from "@aws-amplify/ui-components";
import StatusBar from '../../components/StatusBar';

const Home = () => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState: any, authData: any) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return (<AmplifyAuthenticator>
    {authState === AuthState.SignedIn && user ? <StatusBar user={user} /> : <div>Loading...</div>}
    <AmplifyInput title='Username'></AmplifyInput>
    <AmplifyButton onClick={() => alert('Hello')}></AmplifyButton>
  </AmplifyAuthenticator >);
};

export default Home;
