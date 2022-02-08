import { waitFor } from '@testing-library/react';
import { Auth } from 'aws-amplify';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import RequireAuth from './RequireAuth';
// TODO : FIX UNIT TEST
describe('Unit Testing : RequireAuth', () => {
  let realAuth: any;

  beforeEach(() => {
    realAuth = (global as any).Auth;
  });

  afterEach(() => {
    (global as any).Auth = realAuth;
  });

  test('Should renders a loading text', () => {
    Auth.currentAuthenticatedUser = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        users: [
          {
            Attributes: [
              {
                Name: 'preferred_username',
                Value: 'test'
              }
            ]
          }
        ]
      });
    });
    
    const component = shallow(
      <MemoryRouter>
        <RequireAuth />
      </MemoryRouter>
    );

    console.log(component.debug());
  });

  test('Should render a loading text', () => {
    Auth.currentAuthenticatedUser = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        users: null
      });
    });

    const component2 = shallow(
      <MemoryRouter>
        <RequireAuth />
      </MemoryRouter>
    );
    waitFor(() => {
      component2.find(RequireAuth).dive().setState({ isAuth: false });
    });
  });
});
