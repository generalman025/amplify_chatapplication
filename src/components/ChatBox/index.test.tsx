import { render, waitFor } from "@testing-library/react";
import { mount, shallow } from "enzyme";
import React from "react";
import { act } from "react-dom/test-utils";
import ChatBox from ".";

test('Should display a chat box', () => {
    const component = mount(<ChatBox />);
    expect(component).toHaveLength(1);
})

test('Should display a textfield', () => {
    const component = mount(<ChatBox />);
    expect(component.find('MessageInput')).toHaveLength(1);
})

test('Should display a sending button', () => {
    const component = mount(<ChatBox />);
    expect(component).toHaveLength(1);
})