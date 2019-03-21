import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import "../styles/register.css";

class Register extends Component {
  render() {
    if (localStorage["user_key"] && localStorage["isLoggedIn"]==="true") {
      return <Redirect to="/home" />
    }
    return (
      <div className="row p-5">
        <div className="col-sm-12 text-center">
          <h1>Register as:</h1>
        </div>
        <div className="col-md-6 text-center">
          <button className="btn btn-info"><Link to='/register/student' className="text-white"><h1>Student</h1></Link></button>
        </div>
        <div className="col-md-6 text-center">
          <button className="btn btn-info"><Link to='/register/company' className="text-white"><h1>Company</h1></Link></button>
        </div>
      </div>
    );
  }
}

export default Register;
