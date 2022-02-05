import { createContext, ReactChild, ReactFragment, ReactPortal, useState } from 'react';
import { CognitoUser } from '@aws-amplify/auth';
import { AuthState } from '@aws-amplify/ui-components';

export interface AuthContextData {
  user: CognitoUser | null;
  username: string;
  authState: AuthState;
  setUser: (user: CognitoUser | null) => void;
  setUsername: (username: string) => void;
  setAuthState: (authState: AuthState) => void;
}

export const authContextDefaultValue: AuthContextData = {
  user: null,
  username: '',
  authState: AuthState.Loading,
  setUser: () => null,
  setUsername: () => null,
  setAuthState: () => null
};

export const AuthContext = createContext<AuthContextData>(
  authContextDefaultValue
);

export const AuthContextProvider = (children: ReactChild) => {
  const [user, setUser] = useState<CognitoUser | null>(null);
  const [username, setUsername] = useState('');
  const [authState, setAuthState] = useState<AuthState>(AuthState.Loading);

  return <AuthContext.Provider value={{
    user,
    username,
    authState,
    setUser,
    setUsername,
    setAuthState
  }}>{children}</AuthContext.Provider>;
}