import { createContext } from 'react';
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
