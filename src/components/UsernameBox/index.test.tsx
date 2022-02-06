import { render, screen } from '@testing-library/react';
import UsernameBox from '.';

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
