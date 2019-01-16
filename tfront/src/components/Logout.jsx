import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

class Login extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this)
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
          sessionStorage["user_key"] = "";
          sessionStorage["isLoggedIn"] = false;
          console.log("While logging out:");
          window.location.reload();
        }
      })
      .catch( response => {
        console.log("Error");
        console.error(response);
      })

  }

  render() {
    if (sessionStorage["isLoggedIn"]==="false") {
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
