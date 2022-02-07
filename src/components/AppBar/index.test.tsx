import { waitFor } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import AppBar from '.';
import { AuthContext, authContextDefaultValue } from '../../context/AuthContext';
import { UtilContext, utilContextDefaultValue } from '../../context/UtilContext';
import { AuthState } from '@aws-amplify/ui-components';
import { CognitoUser } from '@aws-amplify/auth';

const mockedUsedNavigate = jest.fn();

const mock = jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));

test('', () => {
    const spy1 = jest.spyOn(React, 'useEffect').mockImplementation(f => f());
    const spy2 = jest.spyOn(React, 'useCallback').mockImplementation(f => f());

    shallow(<MemoryRouter><AppBar /></MemoryRouter>);
    expect(true).toBeTruthy();
    
    spy1.mockRestore();
    spy2.mockRestore();
    mock.restoreAllMocks();
})

// test('', () => {
//     let container: any;
//     ReactDOM.render((
//         <UtilContext.Provider value={{...utilContextDefaultValue, callAlert: jest.fn()}}>
//           <AuthContext.Provider value={{
//             ...authContextDefaultValue,
//             authState: AuthState.SignedIn,
//             user: { getUserAttributes: () => { [{ Name: 'preferred_username', Value: 'test' }] } } as unknown as CognitoUser
//           }}>
//             <MemoryRouter><AppBar /></MemoryRouter>
//           </AuthContext.Provider>
//         </UtilContext.Provider>
//       ), container);
// })