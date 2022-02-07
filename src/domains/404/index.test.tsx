import { screen, render } from '@testing-library/react';
import NotFound from '.';

test('Should render a 404 text', () => {
    render(<NotFound />);
    const text = screen.getByText('404');
    expect(text).toBeInTheDocument();
  });