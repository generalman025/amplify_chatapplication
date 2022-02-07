import { screen, render, waitFor } from '@testing-library/react';
import Amplify, { Auth } from 'aws-amplify';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

describe('', () => {
    let realAuth: any;

    beforeEach(() => {
        realAuth = (global as any).Auth;
    });

    afterEach(() => {
        (global as any).Auth = realAuth;
    });
    
    test('Should render a loading text', () => {
        waitFor(() => {
            
            Auth.currentAuthenticatedUser = jest.fn().mockImplementation(() => {
                return Promise.resolve({
                    users: [
                        {
                            Attributes: [
                                {
                                    Name: "preferred_username",
                                    Value: "test",
                                }
                            ]
                        }
                    ]
                });
            })
            
            const component = render(<MemoryRouter><RequireAuth /></MemoryRouter>);
            expect(component.findAllByDisplayValue('Loading...')).toHaveLength(1);
        })
      });
})