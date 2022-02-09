import { waitFor } from '@testing-library/react';
import { API } from 'aws-amplify';
import { mount, render } from 'enzyme';
import UserListsBox from '.';

describe('Unit Testing : UserListBox', () => {
  let realConsoleError: any;
  let realAPIGet: any;
//   beforeAll(() => {
//     realConsoleError = console.error;
//     console.error = jest.fn(); // suppress warnings

//     realAPIGet = API.get;
//   });

//   afterAll(() => {
//     console.error = realConsoleError;

//     API.get = realAPIGet;
//   });

  test('Should display an alert', () => {
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
          },
          {
            Attributes: [
              {
                Name: 'preferred_username',
                Value: 'test2'
              }
            ]
          },
          {
            Attributes: [
              {
                Name: 'preferred_username',
                Value: 'test3'
              }
            ]
          }
        ]
      });
    });

    let component = mount(<UserListsBox />);
    waitFor(() => {
        // component.setState({ allUsers: API.get });
        console.log(component.html());
    });
  });
});
