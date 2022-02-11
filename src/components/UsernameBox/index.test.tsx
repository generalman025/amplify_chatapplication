import { mount, shallow } from 'enzyme';
import { CognitoUser } from '@aws-amplify/auth';
import { AuthState } from '@aws-amplify/ui-components';
import UsernameBox from '.';
import {
  authContextDefaultValue,
  AuthContext
} from '../../context/AuthContext';
import {
  UtilContext,
  utilContextDefaultValue
} from '../../context/UtilContext';

describe('Unit Testing : UsernameBox', () => {
  test('Should render a textbox', () => {
    const component = shallow(<UsernameBox />);
    const input = component.find('#preferredUsername');
    input.simulate('change', { target: { value: 'test' } });
    expect(component.find('#preferredUsername').debug()).toContain('test');
  });

  test('Should render a button', () => {
    const callAlert = jest.fn();
    const component = mount(
      <UtilContext.Provider
        value={{ ...utilContextDefaultValue, callAlert: callAlert }}
      >
        <AuthContext.Provider
          value={{
            ...authContextDefaultValue,
            authState: AuthState.SignedIn,
            user: {
              getUserAttributes: () => [
                { Name: 'preferred_username', Value: 'test' }
              ]
            } as unknown as CognitoUser
          }}
        >
          <UsernameBox />
        </AuthContext.Provider>
      </UtilContext.Provider>
    );

    const button = component.find('#changeUsernameButton').last();
    button.simulate('click');
    expect(callAlert).toHaveBeenCalled();
  });
});
