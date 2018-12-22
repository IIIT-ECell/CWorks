import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      key: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isLoggedIn: nextProps.getMark,});
    this.state.key = nextProps.getKey;
    console.log('Props received at Login');
    console.log(this.state);
  }

  componentWillMount() {
    this.state.isLoggedIn = this.props.getMark;
    this.state.key = this.props.getKey;
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:8000/api/rest-auth/logout/")
      .then( response => {
        console.log(response);
        return response;
      })
      .then( response => {
        if (response.status >= 200 && response.status < 206) {
          console.log(response.detail);
          this.props.setMark(false);
          this.props.setKey("");
          let appState = {
            isLoggedIn: this.props.getMark,
            key: this.props.getKey,
          };
          localStorage["appState"] = JSON.stringify(appState);
          console.log("While logging out:")
          console.log(appState);
        }
      })
      .catch( response => {
        console.log("Error");
        console.error(response);
      })

  }

  render() {
    if (!this.props.getKey) {
      return <Redirect to="/home" />
    }
    return (
      <div>
        {console.log(this.state)}
        <div className="topFreeze">
          <h1>LOGOUT</h1>
        </div>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <h3>Are you sure you want to log out?</h3>
            <button type="submit" className="btn btn-block">Yes</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
