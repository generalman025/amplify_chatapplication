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
  const handleClose = () => {
    setShowAlert(false);
    if (severity === SeverityType.success) onSuccess();
  };

  return (
    <Snackbar
      data-testid="alert-bar"
      open={showAlert}
      autoHideDuration={1500}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      onClose={handleClose}
    >
      <MuiAlert variant="outlined" severity={severity as unknown as AlertColor}>
        {alertMessage}
      </MuiAlert>
    </Snackbar>
  );
}
