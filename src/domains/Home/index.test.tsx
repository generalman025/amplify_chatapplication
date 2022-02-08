import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Home from ".";
import Alert from "../../components/Alert";
import AppBar from "../../components/AppBar";
import UsernameBox from "../../components/UsernameBox";

describe('Unit Testing : Home', () => {

    test('Should contains an authenticator', () => {
        const component = mount(<MemoryRouter><Home /></MemoryRouter>);
        expect(component.find(AmplifyAuthenticator)).toHaveLength(1);
    });

    test('Should contains an application bar', () => {
        const component = mount(<MemoryRouter><Home /></MemoryRouter>);
        expect(component.find(AppBar)).toHaveLength(1);
    });

    test('Should contains an username box', () => {
        const component = mount(<MemoryRouter><Home /></MemoryRouter>);
        expect(component.find(UsernameBox)).toHaveLength(1);
    });

    test('Should contains an alert box', () => {
        const component = mount(<MemoryRouter><Home /></MemoryRouter>);
        expect(component.find(Alert)).toHaveLength(1);
    });

})