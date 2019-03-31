import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import "../styles/register.css";

class Register extends Component {
  render() {
    if (localStorage["user_key"] && localStorage["isLoggedIn"] === "true") {
      return <Redirect to="/home" />
    }

    return (
      <div className="trial">
        <h1 className="text-center">Register as:</h1>

        <div className="mb-5"></div>

        <div className="row">
            <div className="col-md-6 col-sm-12 mb-2"><Link to='/register/student' className='btn btn-primary btn-block'>Student</Link></div>
            <div className="col-md-6 col-sm-12"><Link to='/register/company' className='btn btn-primary btn-block'>Company</Link></div>
        </div>
      </div>
    );
  }
}

export default Register;
