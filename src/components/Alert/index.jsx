import CloseIcon from '@mui/icons-material/Close'
import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'

const style = {
  width: '100%',
  my: 2,
  px: '0 !important',
}

const AlertComponent = ({ error, handleClose }) => {
  if (error) {
    return (
      <Container maxWidth="md" sx={style}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => handleClose(error.id)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {error.message}
        </Alert>
      </Container>
    )
  }
  return null
}

export default AlertComponent
