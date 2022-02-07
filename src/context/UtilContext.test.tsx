import { SeverityType } from '../components/Alert';
import { utilContextDefaultValue, UtilContextProvider } from './UtilContext';

test('Should return null values', () => {
    expect(utilContextDefaultValue.setSeverity(SeverityType.success)).toBe(null);
    expect(utilContextDefaultValue.setAlertMessage('')).toBe(null);
    expect(utilContextDefaultValue.setShowAlert(true)).toBe(null);
    expect(utilContextDefaultValue.callAlert(true,
        '',
        SeverityType.success)).toBe(null);
});

