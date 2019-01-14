import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

import "../styles/login.css";

class CreateStudent extends Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            key: "",
        };

        this.formData = {
            student_id: 0,
            gender: "",
            permanent_city: "",
            nationality: "",
            year_of_study: "",
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleInput(event) {
        event.preventDefault();
        this.formData[event.target.id] = event.target.value;
    }

    handleSubmit(event) {
        event.preventDefault();
        let fd = new FormData();
        fd.append("student_id", this.formData.student_id);
        fd.append("gender",this.formData.gender);
        fd.append("permanent_city",this.formData.permanent_city);
        fd.append("nationality",this.formData.nationality);
        fd.append("used_id",this.formData.used_id);
        fd.append("year_of_study",this.formData.year_of_study);

        axios
        .post(
            "http://localhost:8000/api/users/students/",
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
                console.log("While registering:");
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
                    <input className = "form-control" placeholder = "Student Id" type="number" id="student_id" onChange={this.handleInput} />
                </div>
                <div className="form-group">
                    <input className = "form-control" placeholder = "Gender" type="text" id="gender" onChange={this.handleInput} />
                </div>
                <div className="form-group">
                    <input className = "form-control" placeholder = "Permanent City" type="text" id="permanent_city" onChange={this.handleInput} />
                </div>
                <div className="form-group">
                    <input className = "form-control" placeholder = "Nationality" type="text" id="nationality" onChange={this.handleInput} />
                </div>
                <div className="form-group">
                    <input className = "form-control" placeholder = "Year of Study" type="number" id="year_of_study" onChange={this.handleInput} />
                </div>
                <div className="form-group">
                    <button className = "btn btn-primary" id = "loginbutton" type="submit">Register</button>
                </div>
            </form>
        );
    }
}

export default CreateStudent;