import React from 'react'
import ReactDOM from 'react-dom'
import '@styles/index.css'
import App from './App'

import theme from '@config/theme'
import { ThemeProvider } from '@mui/material/styles'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from '@pages/login'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router history="">
        <Switch>
          <Route exact path="/" component={App}></Route>
          <Route exact path="/login" component={Login}></Route>
        </Switch>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
