import { render, waitFor } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import { MemoryRouter } from 'react-router-dom';
import RequireAuth from './RequireAuth';

describe('Unit Testing : RequireAuth', () => {
  test('Should renders a loading text', () => {
    Auth.currentAuthenticatedUser = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        users: null
      });
    });

    const realSetIsAuth = (global as any).setIsAuth;
    const realSetUser = (global as any).setUser;
    (global as any).setIsAuth = jest.fn();
    (global as any).setUser = jest.fn();

    const component = render(
      <MemoryRouter>
        <RequireAuth />
      </MemoryRouter>
    );
    waitFor(() => {
      expect(component).toContain('Loading...');

      (global as any).setIsAuth = realSetIsAuth;
      (global as any).setUser = realSetUser;
    });
  });
});
