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

// import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      key: "",
    };
  }

  componentDidMount() {
    let state = localStorage["appState"];
    if (state) {
      console.log('Read from localStorage');
      let AppState = JSON.parse(state);
      console.log(AppState);
      this.setState({isLoggedIn: AppState.isLoggedIn, user: AppState.user});
    }
  }

  loginMarker = (p) => {
    this.setState({
      isLoggedIn: p,
    });
  }

  loginKey = (k) => {
    this.setState({
      key: k,
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav className='navbar navbar-expand-md'>
              <Link to='/home' className='navbar-brand'>Campus Works</Link>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
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
                <Route exact path='/' render={(props) => <Login {...props} setKey={k=>{this.loginKey(k)}} setMark={p=>{this.loginMarker(p)}} getKey={this.state.key} getMark={this.state.isLoggedIn} />} />
                <Route exact path='/login' render={(props) => <Login {...props} setKey={k=>{this.loginKey(k)}} setMark={p=>{this.loginMarker(p)}} getKey={this.state.key} getMark={this.state.isLoggedIn} />} />
                <Route exact path='/register' render={(props) => <Register {...props} setKey={k=>{this.loginKey(k)}} setMark={p=>{this.loginMarker(p)}} getKey={this.state.key} getMark={this.state.isLoggedIn} />} />
                <Route exact path='/home' render={(props) => <Home {...props} setKey={k=>{this.loginKey(k)}} setMark={p=>{this.loginMarker(p)}} getKey={this.state.key} getMark={this.state.isLoggedIn} />} />
                <Route exact path='/profile' render={(props) => <Profile {...props} setKey={k=>{this.loginKey(k)}} setMark={p=>{this.loginMarker(p)}} getKey={this.state.key} getMark={this.state.isLoggedIn} />} />
                <Route exact path='/user/:id' render={(props) => <User {...props} setKey={k=>{this.loginKey(k)}} setMark={p=>{this.loginMarker(p)}} getKey={this.state.key} getMark={this.state.isLoggedIn} />} />
                <Route exact path='/logout' render={(props) => <Logout {...props} setKey={k=>{this.loginKey(k)}} setMark={p=>{this.loginMarker(p)}} getKey={this.state.key} getMark={this.state.isLoggedIn} />} />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
