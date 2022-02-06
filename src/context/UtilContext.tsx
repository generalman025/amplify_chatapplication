import { createContext, useState } from 'react';
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

interface InputProviderProps {
  children: React.ReactNode;
}

export const UtilContextProvider = ({ children }: InputProviderProps) => {
  const [severity, setSeverity] = useState(SeverityType.success);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const callAlert = (
    showAlertParam: boolean,
    alertMessageParam: string,
    severityParam: SeverityType
  ) => {
    setShowAlert(showAlertParam);
    setAlertMessage(alertMessageParam);
    setSeverity(severityParam);
  };

  return (
    <UtilContext.Provider
      value={{
        severity,
        alertMessage,
        showAlert,
        setSeverity,
        setAlertMessage,
        setShowAlert,
        callAlert
      }}
    >
      {children}
    </UtilContext.Provider>
  );
};
