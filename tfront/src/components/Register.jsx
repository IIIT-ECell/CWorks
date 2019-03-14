import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import "../styles/register.css";

class Register extends Component {
  render() {
    if (sessionStorage["user_key"] && sessionStorage["isLoggedIn"]==="true") {
      return <Redirect to="/home" />
    }
    return (
      <div className="col-md-6">
        <h1>Register as:</h1>
        <Link to='/register/student'>Student</Link>
        <Link to='/register/company'>Company</Link>
      </div>
    );
  }
}

export default Register;
