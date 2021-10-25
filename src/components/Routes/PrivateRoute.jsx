import { Route, Redirect } from 'react-router-dom'
import useAuth from '@hooks/useAuth'

import Loader from '@components/Loader'
import Header from '@components/Header'
import Container from '@mui/material/Container'

import { useEffect } from 'react'

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user, loading } = useAuth()

  if (loading) return <Loader />

  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? (
          <Container maxWidth="md">
            <Header />
            <Component {...props} />
          </Container>
        ) : (
          <Redirect to="/login" />
        )
      }}
    />
  )
}
