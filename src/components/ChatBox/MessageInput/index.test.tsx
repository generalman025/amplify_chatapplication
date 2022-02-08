import { render, screen, fireEvent } from '@testing-library/react';
import MessageInput from '.';

describe('Unit Testing : MessageInput', () => {
  test('Should display a placeholder', () => {
    const handleSubmit = jest.fn();
    render(
      <MessageInput
        message=""
        setMessage={() => true}
        handleSubmit={handleSubmit}
      />
    );
    const input = screen.getByPlaceholderText('Type your message here...');
    expect(input).toBeInTheDocument();
  });

  test('Should display an input message', () => {
    const setMessage = jest.fn();
    const dom = render(
      <MessageInput
        message=""
        setMessage={setMessage}
        handleSubmit={() => true}
      />
    );
    const input = dom.container.querySelector('#messageInput');
    fireEvent.change(input as Element, { target: { value: 'test' } });
    expect(setMessage.mock.calls[0][0]).toBe('test');
  });
});
