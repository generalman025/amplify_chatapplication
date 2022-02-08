import { mount, shallow } from 'enzyme';
import { CognitoUser } from '@aws-amplify/auth';
import { AuthState } from '@aws-amplify/ui-components';
import UsernameBox from '.';
import { authContextDefaultValue, AuthContext } from '../../context/AuthContext';
import { UtilContext, utilContextDefaultValue } from '../../context/UtilContext';

describe('Unit Testing : UsernameBox', () => {

  test('Should render a textbox', () => {
    const component = shallow(<UsernameBox />);
    const input = component.find('#preferredUsername');
    input.simulate('change', { target: { value: 'test' } });
  });

  test('Should render a button', () => {
    const component = shallow(<UsernameBox />);
    const input = component.find('#changeUsernameButton');
    input.simulate('click');
  });

  test('Should render a button', () => {
    const component = mount(
      <UtilContext.Provider value={{ ...utilContextDefaultValue, callAlert: jest.fn() }}>
        <AuthContext.Provider value={{
          ...authContextDefaultValue,
          authState: AuthState.SignedIn,
          user: { getUserAttributes: () => ([{ Name: 'preferred_username', Value: 'test' }]) } as unknown as CognitoUser
        }}>
          <UsernameBox />
        </AuthContext.Provider>
      </UtilContext.Provider>
    );
  });
})
