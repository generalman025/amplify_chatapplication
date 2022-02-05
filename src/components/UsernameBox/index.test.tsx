import { render, screen } from '@testing-library/react';
import UsernameBox from '.';
import { AuthContext, AuthContextProvider } from '../../context/AuthContext';
import { AuthState } from '@aws-amplify/ui-components';
import { createContext, ReactChild } from 'react';
import { CognitoUser } from '@aws-amplify/auth';

test('Should render a textbox', () => {
    render(<UsernameBox />);
    const linkElement = screen.getByLabelText(/Preferred Username/i);
    expect(linkElement).toBeInTheDocument();
});


test('Should render a button', () => {
    render(<UsernameBox />);
    const linkElement = screen.getByText(/Proceed to Chat Room/i);
    expect(linkElement).toBeInTheDocument();
});

const customRender = (ui: any, { providerProps, ...renderOptions }: any) => {
    return render(
        <AuthContextProvider {...providerProps}>{ui}</AuthContextProvider>,
        renderOptions,
    )
}


test('Should render a default username', () => {
    // jest.mock("../../context/AuthContext", () => ({
    //     __esModule: true,
    //     default: createContext({ username: 'test' })
    // }));
    // render(<AuthContext.Provider value={{ username: 'test', user: null, authState: AuthState.SignedIn, setUsername: (() => true), setUser: (() => true), setAuthState: (() => true) }}><UsernameBox /></AuthContext.Provider>);
    customRender(<UsernameBox />, { username: 'test' });
    const linkElement = screen.getByLabelText(/test/i);
    expect(linkElement).toBeInTheDocument();
});