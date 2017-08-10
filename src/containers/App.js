import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import './App.css'

import List from '../containers/List'
import Details from '../containers/Details'
import NotFound from '../containers/NotFound'

import { Route, Switch, Redirect } from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={List}/>
        <Route path='/details/:asteroid_id' component={Details}/>
        <Route path='/notfound/' component={NotFound}/>
        <Redirect to="/#" />
      </Switch>
    )
  }
}
