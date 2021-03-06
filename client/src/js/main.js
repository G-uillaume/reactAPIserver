import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Users from './components/Users'
import Cars from './components/Cars'
import Home from './components/Home'
import AddUser from './components/AddUser'
import AddCar from './components/AddCar'

const App = () => {


  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={Users} />
          <Route path="/users/add" component={AddUser} />
          <Route exact path="/cars" component={Cars} />
          <Route path="/cars/add" component={AddCar} />
        </Switch>
      </Router>
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)