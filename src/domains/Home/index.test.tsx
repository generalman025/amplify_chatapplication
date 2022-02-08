import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import Home from ".";
import { SeverityType } from "../../components/Alert";
import { UtilContext, utilContextDefaultValue } from "../../context/UtilContext";

test('', () => {
    const zz = jest.fn();
    (global as any).proceedToChatRoom = zz;
    const comp = mount(<BrowserRouter>
    <UtilContext.Provider value={{ ...utilContextDefaultValue, callAlert: jest.fn(), showAlert:true, severity: SeverityType.success }}>
    <Home />
    </UtilContext.Provider>
    </BrowserRouter>);
    expect(true).toBeTruthy();
})