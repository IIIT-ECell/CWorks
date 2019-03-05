import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import User from './components/User';
import Profile from './components/Profile';
import CreateStudent from './components/CreateStudent';

// import logo from './logo.svg';
import './App.css';
import CreateCompany from './components/CreateCompany';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav className='navbar navbar-expand-md'>
              <Link to='/home' className='navbar-brand'>Campus Works</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <Link to='/login' className='nav-item nav-link'>Login</Link>
                <Link to='/register' className='nav-item nav-link'>Register</Link>
                <Link to='/home' className='nav-item nav-link'>Home</Link>
                <Link to='/profile' className='nav-item nav-link'>Profile</Link>
                <Link to='/logout' className='nav-item nav-link'>Logout</Link>
              </div>
            </nav>
            <div className="container">
              <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/register/student' component={CreateStudent} />
                <Route exact path='/register/company' component={CreateCompany} />
                <Route exact path='/home' component={Home} />
                <Route exact path='/profile' component={Profile} />
                <Route exact path='/user/:id'  component={User} />
                <Route exact path='/logout'  component={Logout} />

              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
