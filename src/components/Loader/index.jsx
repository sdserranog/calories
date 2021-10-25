import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

export default function Loader({ size = 80 }) {
  return (
    <Box sx={style}>
      <Grid container justifyContent="center" alignItems="center">
        <CircularProgress size={size} />
      </Grid>
    </Box>
  )
}
