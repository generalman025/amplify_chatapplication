import { waitFor } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthState } from '@aws-amplify/ui-components';
import { CognitoUser } from '@aws-amplify/auth';
import AppBar from '.';
import { AuthContext, authContextDefaultValue } from '../../context/AuthContext';
import { UtilContext, utilContextDefaultValue } from '../../context/UtilContext';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

describe('Unit Testing : AppBar', () => {

  test('Should render an application bar', () => {
    const component = shallow(<MemoryRouter><AppBar /></MemoryRouter>);
    expect(component.find(AppBar)).toHaveLength(1);
  })

  test('Should show a greeting message', () => {
    const component = mount((
      <MemoryRouter>
        <UtilContext.Provider value={{ ...utilContextDefaultValue }}>
          <AuthContext.Provider value={{
            ...authContextDefaultValue,
            authState: AuthState.SignedIn,
            user: { getUserAttributes: ((_error: any, attrs: any = [{ Name: 'preferred_username', Value: 'test' }]) => jest.fn()) } as unknown as CognitoUser,
            username: 'test'
          }}>
            <AppBar />
          </AuthContext.Provider>
        </UtilContext.Provider></MemoryRouter>
    ));

    expect(component.text()).toContain('Hello, test');
  })

  test('Should show an alert on error', () => {
    const callAlert = jest.fn();
    const component = mount((
      <MemoryRouter>
        <UtilContext.Provider value={{ ...utilContextDefaultValue, callAlert: callAlert }}>
          <AuthContext.Provider value={{
            ...authContextDefaultValue
          }}>
            <AppBar />
          </AuthContext.Provider>
        </UtilContext.Provider></MemoryRouter>
    ));

    waitFor(() => {
      component.find('#logoutButton').last().simulate('click');
      expect(callAlert).toBeCalled();
    })
  })

})
