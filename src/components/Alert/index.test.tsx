import { mount, shallow } from 'enzyme';
import Alert, { SeverityType } from '.';

describe('Unit Testing : Alert', () => {
  test('Should display an alert', () => {
    const component = mount(
      <Alert
        showAlert={true}
        alertMessage=""
        severity={SeverityType.success}
        setShowAlert={jest.fn()}
        onSuccess={jest.fn()}
      />
    );
    expect(component.debug()).toContain('SuccessOutlinedIcon');
  });

  test('Should call an onSuccess event', () => {
    const onSuccess = jest.fn();
    const component = shallow(
      <Alert
        showAlert={true}
        alertMessage=""
        severity={SeverityType.success}
        setShowAlert={jest.fn()}
        onSuccess={onSuccess}
      />
    );
    component.simulate('close');
    expect(onSuccess).toBeCalled();
  });

  test('Should not call an onSuccess event on error', () => {
    const onSuccess = jest.fn();
    const component = shallow(
      <Alert
        showAlert={true}
        alertMessage=""
        severity={SeverityType.error}
        setShowAlert={jest.fn()}
        onSuccess={onSuccess}
      />
    );
    component.simulate('close');
    expect(onSuccess).toBeCalledTimes(0);
  });
});
