import { render, waitFor } from "@testing-library/react";
import { mount, shallow } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";
import ChatBox from ".";

test('', () => {
    const spy = jest.spyOn(React, 'useEffect').mockImplementation(f => f());
    shallow(<ChatBox />);
    expect(true).toBeTruthy();
    spy.mockRestore();
})