import { render, screen } from '@testing-library/react';
import UsernameBox from '.';


test('Should render textbox', () => {
    render(<UsernameBox />);
    const linkElement = screen.getByText(/Preferred Username/i);
    console.log(screen);
    expect(linkElement).toBeInTheDocument();
  });
  

test('Should render button', () => {
  render(<UsernameBox />);
  const linkElement = screen.getByText(/Proceed to Chat Room/i);
  console.log(screen);
  expect(linkElement).toBeInTheDocument();
});
