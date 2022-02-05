import { render, screen } from '@testing-library/react';
import UsernameBox from '.';

test('Should render button', () => {
  render(<UsernameBox />);
  const linkElement = screen.getByText(/Proceed to Chat Room/i);
  expect(linkElement).toBeInTheDocument();
});
