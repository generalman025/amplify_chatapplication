import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import UsernameBox from '.';
import { AuthContext } from '../../context/AuthContext';

beforeAll(() => {
    const {setUsername} = useContext(AuthContext);
    setUsername('test');
})

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
