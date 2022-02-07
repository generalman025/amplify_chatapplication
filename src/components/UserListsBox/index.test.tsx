import { render, waitFor } from "@testing-library/react";
import { API } from "aws-amplify";
import { shallow } from "enzyme";
import React, { useEffect } from "react";
import UserListsBox from ".";

let realFetchAllUsers: any;
let realAPI: any;

// Setup mock
beforeEach(() => {
    realAPI = (global as any).API;
    realFetchAllUsers = (global as any).fetchAllUsers;
});

// Cleanup mock
afterEach(() => {
    (global as any).API = realAPI;
    (global as any).fetchAllUsers = realFetchAllUsers;
});

test('Should display an alert', () => {
    const setStateMock = jest.fn();
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
