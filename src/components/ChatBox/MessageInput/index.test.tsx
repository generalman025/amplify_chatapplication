import { render, screen, fireEvent } from '@testing-library/react';
import MessageInput from '.';

test('Should display a placeholder', () => {
  const handleSubmit = jest.fn();
  render(
    <MessageInput message="" setMessage={() => true} handleSubmit={handleSubmit} />);
  const input = screen.getByPlaceholderText('Type your message here...');
  expect(input).toBeInTheDocument();
});

test('test 2', () => {
  const dom = render(<MessageInput message="" setMessage={() => true} handleSubmit={() => true} />);
  const input = dom.container.querySelector('#messageInput');
  fireEvent.change(input as Element, { target: { value: '5555555' } });
  // expect(screen.getByDisplayValue('Type your message here...')).toBe(true);
});