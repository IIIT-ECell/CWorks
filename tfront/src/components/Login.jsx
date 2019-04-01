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

        let passwd_error = document.getElementById('password_error'),
            passwd_input = document.getElementById('password');

        if (passwd_error.classList.contains("invalid")) {
            passwd_error.classList.remove("invalid");
            passwd_error.classList.add("invisible");
            passwd_input.classList.remove("is-invalid");
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.formData);
        let fd = new FormData();
        fd.append("username", this.formData.username);
        fd.append("password", this.formData.password);

        axios({
            method:"POST",
            url:"https://abhigyanghosh30.pythonanywhere.com/api/rest-auth/login/",
            data:fd,
            headers:{
                'Access-Control-Allow-Origin':'https://abhigyanghosh30.pythonanywhere.com',
            }

        }
        ).then( response => {
            console.log(response);
            return response;
        }).then( response => {
            if (response.status >= 200 && response.status < 206) {
                console.log(response.data);
                localStorage["isLoggedIn"] = true;
                localStorage["user_key"] = response.data.key;
                console.log("While logging in:");
                axios({
                    method: "GET",
                    url: "https://abhigyanghosh30.pythonanywhere.com/api/rest-auth/user",
                    headers: {
                        'Access-Control-Allow-Origin':'https://abhigyanghosh30.pythonanywhere.com',
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + response.data.key
                    }
                }).then((res)=>{
                    localStorage["pk"] = res.data.pk;
                    console.log(res.data);
                    axios({
                        method: "GET",
                        url: "https://abhigyanghosh30.pythonanywhere.com/api/users/users/"+res.data.pk+"/",
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin':'https://abhigyanghosh30.pythonanywhere.com',
                        }
                    }).then((resp)=>{
                        console.log(resp);
                        localStorage["user_type"]=resp.data.user_type;
                        localStorage["user_id"]=resp.data.id;
                    })
                    this.props.history.push('/home');
                })
            }
        }).catch( response => {
            console.log("Error");
            console.error(response);
            this.setState({error:response})
            let passwd_input = document.getElementById('password'),
                passwd_error = document.getElementById('password_error');

            passwd_input.classList.add("is-invalid");
            passwd_error.classList.add("invalid");
            passwd_error.classList.remove("invisible");
        });
    }

    render() {
        if (localStorage["isLoggedIn"]==="true"){
            return <Redirect to="/home" />
        }

        const logoUrl = require(`../images/f81.jpeg`)
        return (
            <form onSubmit={this.handleSubmit} className="form-signin">
                <div className="form-group">
                    <img className="logoimg" src={logoUrl} alt="placeholder logo" />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input className="form-control" type="text" id="username" name="username" onChange={this.handleInput} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" type="password" id="password" name="password" onChange={this.handleInput} required />

                    <small id="password_error" className="text-danger invisible">
                        Please check the password you have entered
                    </small>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" id="loginbutton" type="submit">Login</button>
                </div>
                Don't have an account? <Link to="/register">Register</Link>
            </form>
        );
    }

    componentDidMount(){
        localStorage["user_type"]="";
        localStorage["user_id"]="";
        localStorage["pk"]="";
        localStorage["isLoggedIn"]=false;
    }
}

export default Login;

