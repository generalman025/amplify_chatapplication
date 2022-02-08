import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import React, { useContext } from 'react';
import UsernameBox from '.';
import { AuthState } from '@aws-amplify/ui-components';
import { authContextDefaultValue, AuthContextProvider, AuthContext } from '../../context/AuthContext';
import { CognitoUser } from '@aws-amplify/auth';
import { UtilContext, utilContextDefaultValue } from '../../context/UtilContext';
import { act } from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import { API, Auth } from 'aws-amplify';

let container: any;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

test('Should render a textbox', () => {
  const x = shallow(<UsernameBox />);

  const input1 = x.find('#preferredUsername');
  input1.simulate('change', { target: { value: 'test' } });
});

test('Should render a textbox', () => {
  const x = shallow(<UsernameBox />);

  const input2 = x.find('#changeUsernameButton');
  input2.simulate('click');
});

test('Should render a button', () => {
  
  const x = mount(
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
  
  waitFor(() => {
    const linkElement = screen.getByText(/Proceed to Chat Room/i);
    expect(linkElement).toBeInTheDocument();
  })
});

// test('', () => {
//   Auth.updateUserAttributes = jest.fn();

//   const x = shallow(<UsernameBox />);
//   // x.setState({input: 'test'});
//   console.log(x.state());

// })
