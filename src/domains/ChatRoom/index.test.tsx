import { mount } from "enzyme";
import ChatRoom from ".";
import UserListsBox from "../../components/UserListsBox";
import ChatBox from "../../components/ChatBox";
import Alert from "../../components/Alert";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

describe('Unit Testing : ChatRoom', () => {
  let realConsoleWarning: any;
  beforeAll(() => {
    realConsoleWarning = console.warn;
    console.warn = jest.fn(); // suppress warnings
  })

  afterAll(() => {
    console.warn = realConsoleWarning;
  })

  test('Should contains a user list box', () => {
    const component = mount(<ChatRoom />);
    expect(component.find(UserListsBox)).toHaveLength(1);
  });

  test('Should contains a chat box', () => {
    const component = mount(<ChatRoom />);
    expect(component.find(ChatBox)).toHaveLength(1);
  });

  test('Should contains an alert box', () => {
    const component = mount(<ChatRoom />);
    expect(component.find(Alert)).toHaveLength(1);
  });
})
