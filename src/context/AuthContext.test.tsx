import {authContextDefaultValue} from './AuthContext';
import { AuthState } from '@aws-amplify/ui-components';

describe('Unit Testing : AuthContext', () => {
  
  test('Should return null values', () => {
      expect(authContextDefaultValue.setUser(null)).toBe(null);
      expect(authContextDefaultValue.setUsername('')).toBe(null);
      expect(authContextDefaultValue.setAuthState(AuthState.Loading)).toBe(null);
    });

})