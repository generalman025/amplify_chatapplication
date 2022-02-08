import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('Unit Testing : App', () => {
  test('Should contain an authenticator', () => {
    const component = mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(component.find(AmplifyAuthenticator)).toHaveLength(1);
  });
});
