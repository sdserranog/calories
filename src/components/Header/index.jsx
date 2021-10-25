import logo from '@assets/images/logo.png'
import useAuth from '@hooks/useAuth'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import { useHistory } from 'react-router-dom'
import styles from './header.module.css'

function Header() {
  const history = useHistory()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    history.push('/login')
  }

  const goHome = () => {
    history.push('/')
  }

  return (
    <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', mb: 4, p: 2 }}>
      <Grid container justifyContent="center">
        <img
          src={logo}
          onClick={goHome}
          height={77}
          width={108}
          alt="logo"
          className={styles['logo-img']}
        />
      </Grid>
      <Button onClick={handleLogout} variant="outlined" size="small">
        LOGOUT
      </Button>
    </Toolbar>
  )
}

export default Header
