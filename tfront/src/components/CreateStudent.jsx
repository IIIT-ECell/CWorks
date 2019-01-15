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
			permanent_city_res: "",
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
		console.log(this.formData);
		let fd1 = new FormData();
		fd1.append("username", this.formData.username);
    fd1.append("email", this.formData.email);
    fd1.append("password1", this.formData.password1);
    fd1.append("password2", this.formData.password2);
		
		axios
      .post(
        "http://localhost:8000/api/rest-auth/registration/",
        fd1
      )
      .then( response => {
				console.log(response);
        if (response.status >= 200 && response.status < 206) {
					console.log(response.data.key);
					axios
					({
						method: "GET",
						url: "http://localhost:8000/api/rest-auth/user",
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Token '+response.data.key
						}
					})			
					.then(response=>{
						console.log(response);
						console.log(response.data.pk);
						// let fd2 = new FormData();
						// fd2.append("student_id", this.formData.student_id);
						// fd2.append("gender", this.formData.gender);
						// fd2.append("permanent_city_res", this.formData.permanent_city_res);
						// fd2.append("nationality", this.formData.nationality);
						// fd2.append("year_of_study", this.formData.year_of_study);
						// fd2.append("user",response.data.pk);
						// console.log(fd2);
						axios({
							method: 'POST',
							url: "http://localhost:8000/api/users/students/",
							data:{
								student_id: this.formData.student_id,
								gender: this.formData.gender,
								permanent_city_res: this.formData.permanent_city_res,
								nationality: this.formData.nationality,
								year_of_study: this.formData.year_of_study,
								user: response.data.pk,
							}
						})
						.then(response=>{
							console.log(response);
						})
					})
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
          <input className = "form-control" placeholder = "Username" type="text" id="username" name="username" onChange={this.handleInput} />
        </div>
        <div className="form-group">
          <input className = "form-control" placeholder = "Email" type="text" id="email" name="email" onChange={this.handleInput} />
        </div>
        <div className="form-group">
          <input className = "form-control" placeholder = "Password" type="password" id="password1" name="password1" onChange={this.handleInput} />
        </div>
        <div className="form-group">
          <input className = "form-control" placeholder = "Verify Password" type="password" id="password2" name="password2" onChange={this.handleInput} />
        </div>
				<div className="form-group">
					<input className="form-control" placeholder="Student Id" type="number" id="student_id" name="student_id" onChange={this.handleInput} />
				</div>
				<div className="form-group">
					<select class="form-control" name="gender" id="gender" onChange={this.handleInput}>
						<option value="M" selected="">Male</option>
						<option value="F">Female</option>
						<option value="O">Other</option>
						<option value="N">Prefer not to say</option>
					</select>
				</div>
				<div className="form-group">
					<input className="form-control" placeholder="Permanent City" type="text" id="permanent_city_res" name="permanent_city_res" onChange={this.handleInput} />
				</div>
				<div className="form-group">
					<input className="form-control" placeholder="Nationality" type="text" id="nationality" name="nationality" onChange={this.handleInput} />
				</div>
				<div className="form-group">
					<select class="form-control" name="year_of_study" id="year_of_study" onChange={this.handleInput}>
            <option value="1" selected="">First Year Undergrad</option>
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
}

export default CreateStudent;