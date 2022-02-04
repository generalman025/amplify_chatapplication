import { createContext } from 'react';
import { SeverityType } from '../components/Alert';

export interface UtilContextData {
  severity: SeverityType;
  alertMessage: string;
  showAlert: boolean;
  setSeverity: (severity: SeverityType) => void;
  setAlertMessage: (alertMessage: string) => void;
  setShowAlert: (showAlert: boolean) => void;
  callAlert: (
    showAlert: boolean,
    alertMessage: string,
    severity: SeverityType
  ) => void;
}

export const utilContextDefaultValue: UtilContextData = {
  severity: SeverityType.success,
  alertMessage: '',
  showAlert: false,
  setSeverity: () => null,
  setAlertMessage: () => null,
  setShowAlert: () => null,
  callAlert: () => null
};

export const UtilContext = createContext<UtilContextData>(
  utilContextDefaultValue
);
