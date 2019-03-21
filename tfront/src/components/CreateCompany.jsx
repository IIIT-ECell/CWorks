import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

import "../styles/login.css";

class CreateCompany extends Component {

    constructor() {
        super();

        this.formData = {};

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(event) {
        event.preventDefault();
        this.formData[event.target.id] = event.target.value;
    }

    handleSubmit(event) {
        event.preventDefault();
        // console.log(this.formData);
        // let fd1 = new FormData();
        // fd1.append("username", this.formData.username);
        // fd1.append("email", this.formData.email);
        // fd1.append("password1", this.formData.password1);
        // fd1.append("password2", this.formData.password2);
        // console.log(fd1);
        axios({
            method:"POST",
			url:"http://10.1.135.18:8000/api/rest-auth/registration/",
            data:{
                username: this.formData['username'],
                email: this.formData['email'],
                password1: this.formData['password1'],
                password2: this.formData['password2'],
            }
        })
        .then(response => {
            console.log(response);
            if (response.status >= 200 && response.status < 206) {
                console.log(response.data.key);
                localStorage["user_key"]=response.data.key;
                axios({
                        method: "GET",
						url: "http://10.1.135.18:8000/api/rest-auth/user",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Token ' + response.data.key
                        }
                    })
                    .then(response => {
                        console.log(response);
                        console.log(response.data.pk);
                        localStorage["pk"]=response.data.pk;
                        axios({
                            method: 'POST',
							url: "http://10.1.135.18:8000/api/users/companies/",
                            data: {
                                name: this.formData.name,
                                company_id: this.formData.company_id,
                                about: this.formData.about,
                                additional_poc: this.formData.additional_poc,
                                user: response.data.pk,
                                email: this.formData['email']
                            }
                        })
                        .then(response => {
                            console.log(response);
                            if (response.status >= 200 && response.status < 206) {
                                localStorage["isLoggedIn"] = true;
                                localStorage["user_id"] = response.data.user_id;
                                localStorage["user_type"]=2;
                            }
                            window.location.reload();
                        })
                        axios({
                            method:"PUT",
							url: "http://10.1.135.18:8000/api/users/users/"+response.data.pk+"/",
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            data: {
                                id: response.data.pk,
                                user_type: 2,
                                name: this.formData.name,
                                phone_number: this.formData.phone_number,
                            }
                        })

                    })
            }
        })
            .catch(response => {
                console.log("Error");
                console.error(response);
            })

    }

    checkPasswordMatch(){
        var pass1 = document.getElementById("password1"),
            pass2 = document.getElementById("password2"),
            errorText = document.getElementById("password2_help");

        if(pass2.value.length && pass2.value !== pass1.value){
            pass2.classList.add("is-invalid");
            errorText.classList.add("invalid");
        }
        else{
            pass2.classList.remove("is-invalid");
            errorText.classList.remove("invalid");
        }
    }

    validatePassword(){
        var pass1 = document.getElementById("password1"),
            errorText = document.getElementById("password1_help"),
            pw = pass1.value;

        // small length, no symbols, no digits, no alphanumeric => ERROR
        if(pw.length < 8 || !/[^\w \d]/.test(pw) || !/[\d]/.test(pw) || !/[a-z]/i.test(pw)){
            pass1.classList.add("is-invalid");
            errorText.classList.add("invalid");
        }
        else{
            pass1.classList.remove("is-invalid")
            errorText.classList.remove("invalid");
        }
    }

    render() {
        if (localStorage["user_key"] && localStorage["isLoggedIn"]==="true") {
            return <Redirect to="/home" />
        }
        const logoUrl = require(`../images/f81.jpeg`);
        return (
            <form onSubmit={this.handleSubmit} className="form-signin">
                <div className="form-group">
                    <img className="logoimg" src={logoUrl} alt="placeholder logo" />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input className="form-control" type="text" id="username" name="username" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" type="text" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password1">Password</label>
                    <input className="form-control" type="password" id="password1" name="password1" required onChange={this.validatePassword} />
                    <small id="password1_help" className="text-danger">
                        Password must be at least eight characters, and have an alphabet, digit and symbol.
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Password match</label>
                    <input className="form-control" type="password" id="password2" name="password2" required onChange={this.checkPasswordMatch} />
                    <small id="password2_help" className="text-danger">
                          Passwords must match.
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="company_id">Company ID</label>
                    <input className="form-control" type="text" id="company_id" name="company_id" required />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Company Name</label>
                    <input className="form-control" type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="about">About Company</label>
                    <input className="form-control" type="text" id="about" name="about" required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone_number">POC phone number</label>
                    <input className="form-control" type="text" id="phone_number" name="phone_number" required />
                </div>
                <div className="form-group">
                    <label htmlFor="additional_poc">Additional POC</label>
                    <input className="form-control" type="text" id="additional_poc" name="additional_poc" required />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" id="loginbutton" type="submit">Register</button>
                </div>
            </form>
        );
    }

    componentDidMount(){
        var inputElms = document.querySelectorAll(".form-signin input, .form-signin select");

        inputElms.forEach(elm => elm.addEventListener("change", ev => this.handleInput(ev)));

        this.validatePassword();
    }
}

export default CreateCompany;

