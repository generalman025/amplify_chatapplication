import { render, screen } from '@testing-library/react';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';

test('login page', () => {
  render(<Router>
    <App/>
    </Router>);
  const linkElement = screen.getByText(/Proceed to Chat Room/i);
  expect(linkElement).toBeInTheDocument();
});
