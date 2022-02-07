import Alert, { SeverityType } from '.';

test('Should display an alert', () => {
    let component = Alert({showAlert:true, alertMessage:'', severity: SeverityType.success, setShowAlert: jest.fn(), onSuccess: jest.fn()});
    expect(component.props.open).toEqual(true);
});

test('Should not call onSuccess when showing an error alert', () => {
    const onSuccess = jest.fn();
    let component = Alert({showAlert:true, alertMessage:'', severity: SeverityType.success, setShowAlert: jest.fn(), onSuccess: onSuccess});
    component.props.onClose();
    expect(onSuccess).toBeCalled();
});

test('Should not call onSuccess when showing an error alert', () => {
    const onSuccess = jest.fn();
    let component = Alert({showAlert:true, alertMessage:'', severity: SeverityType.error, setShowAlert: jest.fn(), onSuccess: onSuccess});
    component.props.onClose();
    expect(onSuccess).toBeCalledTimes(0);
});