import Alert, { SeverityType } from '.';

describe('Unit Testing : Alert', () => {
    
    test('Should display an alert', () => {
        const component = Alert({showAlert:true, alertMessage:'', severity: SeverityType.success, setShowAlert: jest.fn(), onSuccess: jest.fn()});
        expect(component.props.open).toEqual(true);
    });
    
    test('Should call an onSuccess event', () => {
        const onSuccess = jest.fn();
        const component = Alert({showAlert:true, alertMessage:'', severity: SeverityType.success, setShowAlert: jest.fn(), onSuccess: onSuccess});
        component.props.onClose();
        expect(onSuccess).toBeCalled();
    });
    
    test('Should not call an onSuccess event on error', () => {
        const onSuccess = jest.fn();
        const component = Alert({showAlert:true, alertMessage:'', severity: SeverityType.error, setShowAlert: jest.fn(), onSuccess: onSuccess});
        component.props.onClose();
        expect(onSuccess).toBeCalledTimes(0);
    });
    
})