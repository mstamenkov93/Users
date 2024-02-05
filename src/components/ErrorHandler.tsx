import { Snackbar, Alert } from '@mui/material'

interface ErrorHandlerProps {
    handleCloseSnackbar: () => void;
    errorMessage: string | null
}

export  const  ErrorHandler = ({ handleCloseSnackbar, errorMessage}: ErrorHandlerProps) => {
  return (
    <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
    <Alert
      onClose={handleCloseSnackbar}
      severity="error"
      variant="filled"
      sx={{ width: '100%' }}
    >
      {errorMessage}
    </Alert>
  </Snackbar>
  )
}
