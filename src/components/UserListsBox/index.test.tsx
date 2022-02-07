import { render, waitFor } from "@testing-library/react";
import { API } from "aws-amplify";
import { shallow } from "enzyme";
import React, { useEffect } from "react";
import UserListsBox from ".";

// let realUseContext: any;
// let useContextMock: any;
let realFetchAllUsers: any;
let realAPI: any;

// Setup mock
beforeEach(() => {
    // realUseContext = React.useContext;
    // useContextMock = React.useContext = jest.fn().mockImplementation(() => ({
    //     user: jest.fn(),
    // }));

    realAPI = (global as any).API;
    realFetchAllUsers = (global as any).fetchAllUsers;
});

// Cleanup mock
afterEach(() => {
    // React.useContext = realUseContext;

    (global as any).API = realAPI;
    (global as any).fetchAllUsers = realFetchAllUsers;
});

test('Should display an alert', () => {
    const setStateMock = jest.fn();
    // const useStateMock: any = (useState: any) => [useState, setStateMock];
    // const useEffectMock: any = jest.fn().mockImplementation(() => {
    //     return () => { };
    // });

    // jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    // jest.spyOn(React, 'useEffect').mockImplementation(useEffectMock);

    const fakeResponse = { title: 'example text' };
    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetchAllUsers = jest.fn().mockResolvedValueOnce(mRes as any);
    (global as any).fetchAllUsers = mockedFetchAllUsers;

    setStateMock(() => ({
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
    }));

    API.get = jest.fn().mockImplementation(() => {
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

    const prop = {
        fetchAllUsers: jest.fn()
    }
    jest.spyOn(React, 'useEffect').mockImplementation(f => f());

    waitFor(() => {

        const { getDOMNode } = shallow(<UserListsBox />);

    })
});
