import { createTheme } from '@mui/material/styles'

const themeOptions = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#24b47f',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffb138',
    },
  },
})

export default themeOptions
