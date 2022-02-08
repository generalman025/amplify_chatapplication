import { mount } from 'enzyme';
import ChatBox from '.';

describe('Unit Testing : ChatBox', () => {
  let realConsoleWarning: any;
  beforeAll(() => {
    realConsoleWarning = console.warn;
    console.warn = jest.fn(); // suppress warnings
  });

  afterAll(() => {
    console.warn = realConsoleWarning;
  });

  test('Should display a chat box', () => {
    const component = mount(<ChatBox />);
    expect(component).toHaveLength(1);
  });

  test('Should display a textfield', () => {
    const component = mount(<ChatBox />);
    expect(component.find('MessageInput')).toHaveLength(1);
  });

  test('Should display a sending button', () => {
    const component = mount(<ChatBox />);
    expect(component).toHaveLength(1);
  });
});
