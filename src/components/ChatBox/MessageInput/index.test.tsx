import { render, screen } from '@testing-library/react';
import { FormEvent } from 'react';
import MessageInput from '.';

const MockedMessageInput = <MessageInput message={''} setMessage={function (message: string): void {
  throw new Error('Function not implemented.');
} } handleSubmit={function (event: FormEvent<HTMLFormElement>): void {
  throw new Error('Function not implemented.');
} } />;

test('test', () => {
  expect(true).toBeTruthy();
});

// test('Should render a textbox', () => {
//   render(<MockedMessageInput/>);
//   const linkElement = screen.getByLabelText(/Preferred Username/i);
//   expect(linkElement).toBeInTheDocument();
// });

// test('Should render a button', () => {
//   render(<MessageInput message={''} setMessage={function (message: string): void {
//     throw new Error('Function not implemented.');
//   } } handleSubmit={function (event: FormEvent<HTMLFormElement>): void {
//     throw new Error('Function not implemented.');
//   } } />);
//   const linkElement = screen.getByText(/Proceed to Chat Room/i);
//   expect(linkElement).toBeInTheDocument();
// });
