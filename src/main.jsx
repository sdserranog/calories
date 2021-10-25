import React from 'react'
import ReactDOM from 'react-dom'
import '@styles/index.css'

import theme from '@config/theme'
import { ThemeProvider } from '@mui/material/styles'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from '@components/Routes/PrivateRoute'

import Home from '@pages/home'
import Login from '@pages/login'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router history="">
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
