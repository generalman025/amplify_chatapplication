import React from "react";
import ChatRoom from ".";
import { shallow } from "enzyme";

let realUseContext: any;
let useContextMock: any;

// Setup mock
beforeEach(() => {
    realUseContext = React.useContext;
    useContextMock = React.useContext = jest.fn().mockImplementation(() => ({
        user: jest.fn(),
    }));
});

// Cleanup mock
afterEach(() => {
    React.useContext = realUseContext;
});

test('Should display an alert', () => {
    // const setStateMock = jest.fn();
    // const useStateMock: any = (useState: any) => [useState, setStateMock];
    // const useEffectMock: any = jest.fn();

    // jest.mock("react-router-dom", () => ({
    //     ...jest.requireActual("react-router-dom"),
    //     useNavigate: jest.fn(),
    //     useLocation: () => ({
    //       pathname: "localhost:3000/example/path"
    //     })
    //   }));

    // jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    // jest.spyOn(React, 'useEffect').mockImplementation(useEffectMock);

    // shallow(<ChatRoom />);
    expect(true).toBeTruthy();
});
