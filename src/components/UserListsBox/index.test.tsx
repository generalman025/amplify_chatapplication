import { API } from 'aws-amplify';
import { mount } from 'enzyme';
import UserListsBox from '.';

describe('Unit Testing : UserListBox', () => {
  let realConsoleError: any;
  let realAPIGet: any;
  beforeAll(() => {
    realConsoleError = console.error;
    console.error = jest.fn(); // suppress warnings

    realAPIGet = API.get;
  });

  afterAll(() => {
    console.error = realConsoleError;

    API.get = realAPIGet;
  });

  test('Should contain a list', () => {
    API.get = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        users: [
          {
            Attributes: [
              {
                Name: 'preferred_username',
                Value: 'test1'
              }
            ]
          }
        ]
      });
    });

    let component = mount(<UserListsBox />);
    expect(component.debug()).toContain('List');
  });
});
