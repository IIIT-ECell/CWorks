import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

import "../styles/login.css";

class CreateStudent extends Component {

    constructor() {
        super();

        this.formData = {
            gender: "M",
            year_of_study: "1"
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(event) {
        event.preventDefault();
        this.formData[event.target.id] = event.target.value;
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.formData);
        // let fd1 = new FormData();
        // fd1.append("username", this.formData.username);
        // fd1.append("email", this.formData.email);
        // fd1.append("password1", this.formData.password1);
        // fd1.append("password2", this.formData.password2);
        // console.log(fd1);
        axios({
            method:"POST",
			url:"http://abhigyanghosh30.pythonanywhere.com/api/rest-auth/registration/",
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
						url: "http://abhigyanghosh30.pythonanywhere.com/api/rest-auth/user",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Token ' + response.data.key
                        }
                })
                .then(response => {
                    localStorage["pk"]=response.data.pk;
                    axios({
                        method: 'POST',
						url: "http://abhigyanghosh30.pythonanywhere.com/api/users/students/",
                        data: {
                            student_id: this.formData.student_id,
                            gender: this.formData.gender,
                            permanent_city_res: this.formData.permanent_city_res,
                            nationality: this.formData.nationality,
                            year_of_study: this.formData.year_of_study,
                            user: response.data.pk,
                        }
                    })
                    .then(response => {
                        console.log(response);
                        if (response.status >= 200 && response.status < 206) {
                            localStorage["isLoggedIn"] = true;
                            localStorage["user_id"] = response.data.user_id;
                            localStorage["user_type"]=1;
                        }
                        window.location.reload();
                    })
                    axios({
                        method:"PUT",
						url: "http://abhigyanghosh30.pythonanywhere.com/api/users/users/"+response.data.pk+"/",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        data: {
                            id: response.data.pk,
                            user_type: 1,
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
            pass2.classList.add("is-invalid")
            errorText.classList.add("invalid");
        }
        else{
            pass2.classList.remove("is-invalid")
            errorText.classList.remove("invalid");
        }
    }

    validatePassword(){
        var pass1 = document.getElementById("password1"),
            errorText = document.getElementById("password1_help"),
            pw = pass1.value;

        // small length, no symbols, no digits, no alphanumeric => ERROR
        if(pw.length < 8 || !/[^\w \d]/.test(pw) || !/[\d]/.test(pw) || !/[a-z]/i.test(pw)){
            pass1.classList.add("is-invalid")
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
        const logoUrl = require(`../images/f81.jpeg`)
        let countryList = ["India", "USA", "Kuwait", "Bahrain", "Saudi Arabia", "UK", "Others"];
        var countries = [<option value="" key="100">Please select your nationality</option>]
        countryList.forEach((country, index) => countries.push(<option key={index} value={country}>{country}</option>));

        return (
            <form onSubmit={this.handleSubmit} className="form-signin" >
                <div className="form-group">
                    <img className="logoimg" src={logoUrl} alt="placeholder logo"/>
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input className="form-control" type="text" id="username" name="username" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input className="form-control" type="email" id="email" name="email" required />
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
                    <label htmlFor="student_id">Student ID</label>
                    <input className="form-control" type="text" id="student_id" name="student_id" required pattern="^\d+$"/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input className="form-control" type="text" id="name" name="name" required pattern="^([a-zA-Z]+ )[a-zA-Z]+$" />
                </div>
                <div className="form-group">
                    <label htmlFor="phone_number">Phone number</label>
                    <input className="form-control" type="text" id="phone_number" name="phone_number" required pattern="^\d+$" />
                </div>
                <div className="form-group">
                    <select className="form-control" name="gender" id="gender" required>
                        <option value="">Please select your gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                        <option value="N">Prefer not to say</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="permanent_city_res">Permanent residence city</label>
                    <input className="form-control" type="text" id="permanent_city_res" name="permanent_city_res" required />
                </div>
                <div className="form-group">
                    <select className="form-control" id="nationality" name="nationality" required>
                        {countries}
                    </select>
                </div>
                <div className="form-group">
                    <select className="form-control" name="year_of_study" id="year_of_study" required>
                        <option value="">Please select your year of study</option>
                        <option value="1">First Year Undergrad</option>
                        <option value="2">Second Year Undergrad</option>
                        <option value="3">Third Year Undergrad</option>
                        <option value="4">Fourth Year Undergrad</option>
                        <option value="5">Postgrads (5th year DD, PG+))</option>
                    </select>
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

export default CreateStudent;

