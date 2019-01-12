import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

import "../styles/login.css";

class Register extends Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      key: "",
    };

    this.formData = {
      email: "",
      username: "",
      password: "",
      vpassword: "",
    }

    this.handleUsername = this.handleUsername.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleVPassword = this.handleVPassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isLoggedIn: nextProps.getMark, key: nextProps.getKey });
    console.log('Props received at Login');
    console.log(this.state);
  }

  componentWillMount() {
    this.setState({ isLoggedIn: this.props.getMark, key: this.props.getKey });
    console.log(this.state);
  }

  handleUsername(event) {
    event.preventDefault();
    this.formData.username = event.target.value;
  }

  handleEmail(event) {
    event.preventDefault();
    this.formData.email = event.target.value;
  }

  handlePassword(event) {
    event.preventDefault();
    this.formData.password = event.target.value;
  }

  handleVPassword(event) {
    event.preventDefault();
    this.formData.vpassword = event.target.value;
  }

  handleSubmit(event) {
    event.preventDefault();
    let fd = new FormData();
    fd.append("username", this.formData.username);
    fd.append("email", this.formData.email);
    fd.append("password1", this.formData.password);
    fd.append("password2", this.formData.vpassword);


    axios
      .post(
        "http://localhost:8000/api/rest-auth/registration/",
        fd
      )
      .then( response => {
        console.log(response);
        return response;
      })
      .then( response => {
        if (response.status >= 200 && response.status < 206) {
          console.log(response.data.key);
          // this.props.route.marklogin();
          this.props.setKey(response.data.key);
          this.props.setMark(true);
          let appState = {
            isLoggedIn: this.props.getMark,
            key: this.props.getKey,
          };
          localStorage["appState"] = JSON.stringify(appState);
          console.log("While registering:")
          console.log(appState);
        }
      })
      .catch( response => {
        console.log("Error");
        console.error(response);
      })

  }

  render() {
    if (this.props.getKey) {
      return <Redirect to="/home" />
    }
    const logoUrl = require(`../images/f81.jpeg`)
    return (
      <form onSubmit={this.handleSubmit} className="form-signin">
        <div className="form-group">
          <img className="logoimg" src={logoUrl} />
        </div>
        <div className="form-group">
          <input className = "form-control" placeholder = "Username" type="text" id="username" onChange={this.handleUsername} />
        </div>
        <div className="form-group">
          <input className = "form-control" placeholder = "Email" type="text" id="email" onChange={this.handleEmail} />
        </div>
        <div className="form-group">
          <input className = "form-control" placeholder = "Password" type="password" id="password" onChange={this.handlePassword} />
        </div>
        <div className="form-group">
          <input className = "form-control" placeholder = "Verify Password" type="password" id="password1" onChange={this.handleVPassword} />
        </div>
        <div className="form-group">
          <button className = "btn btn-primary" id = "loginbutton" type="submit">Register</button>
        </div>
      </form>
    );
  }
}

export default Register;
