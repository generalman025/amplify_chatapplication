import { useCallback } from 'react';
import { Alert as MuiAlert, AlertColor, Snackbar } from '@mui/material';

type AlertBoxProps = {
  showAlert: boolean;
  alertMessage: string;
  severity: SeverityType;
  setShowAlert: (showAlert: boolean) => void;
  onSuccess: () => void;
};

export enum SeverityType {
  success = 'success',
  error = 'error'
}

export default function Alert({
  showAlert,
  alertMessage,
  severity,
  setShowAlert,
  onSuccess
}: AlertBoxProps) {
  const handleClose = useCallback(() => {
    setShowAlert(false);
    if (severity === SeverityType.success) onSuccess();
  }, [severity]);

  return (
    <Snackbar
      data-testid="alert-bar"
      open={showAlert}
      autoHideDuration={2000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}
    >
      <MuiAlert variant="filled" severity={severity as unknown as AlertColor}>
        {alertMessage}
      </MuiAlert>
    </Snackbar>
  );
}
