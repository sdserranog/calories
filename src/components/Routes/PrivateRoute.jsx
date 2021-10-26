import Header from '@components/Header'
import Loader from '@components/Loader'
import useAuth from '@hooks/useAuth'
import Container from '@mui/material/Container'
import { Redirect, Route } from 'react-router-dom'

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user, loading } = useAuth()

  if (loading) return <Loader />
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          return (
            <Container maxWidth="md">
              <Header />
              <Component {...props} />
            </Container>
          )
        }
        return <Redirect to="/login" />
      }}
    />
  )
}
