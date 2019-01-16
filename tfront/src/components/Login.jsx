import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";

import axios from 'axios';

import "../styles/login.css";

class Login extends Component {

  constructor() {
    super();

    this.formData = {}

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInput(event) {
		event.preventDefault();
		this.formData[event.target.id] = event.target.value;
	}

  handleSubmit(event) {
    event.preventDefault();
		console.log(this.formData);
    let fd = new FormData();
    fd.append("username", this.formData.username);
    fd.append("password", this.formData.password);

    axios
      .post(
        "http://localhost:8000/api/rest-auth/login/",
        fd
      )
      .then( response => {
        console.log(response);
        return response;
      })
      .then( response => {
        if (response.status >= 200 && response.status < 206) {
          console.log(response.data.key);
          sessionStorage["isLoggedIn"] = true;
          sessionStorage["user_key"] = response.data.key;
          console.log("While logging in:");
          window.location.reload();
        }
      })
      .catch( response => {
        console.log("Error");
        console.error(response);
      })

  }

  render() {
    if (sessionStorage["isLoggedIn"]==="true"){
      return <Redirect to="/home" />
    }
    const logoUrl = require(`../images/f81.jpeg`)
    return (
   	  <form onSubmit={this.handleSubmit} className="form-signin">
        <div className="form-group">
          <img className="logoimg" src={logoUrl} alt="placeholder logo" />
        </div>
        <div className="form-group">
          <input className = "form-control" placeholder = "Username" type="text" id="username" onChange={this.handleInput} />
        </div>
        <div className="form-group">
          <input className = "form-control" placeholder = "Password" type="password" id="password" onChange={this.handleInput} />
        </div>
        <div className="form-group">
          <button className = "btn btn-primary" id = "loginbutton" type="submit">Login</button>
        </div>
        Don't have an account? <Link to="/register">Register</Link>
      </form>

    );
  }
}

export default Login;
