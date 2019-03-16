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
			url:"http://localhost:8000/api/rest-auth/registration/",
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
						url: "http://localhost:8000/api/rest-auth/user",
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
							url: "http://localhost:8000/api/users/companies/",
							data: {
								company_id: this.formData.company_id,
								about: this.formData.about,
								additional_poc: this.formData.additional_poc,
								user: response.data.pk,
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
							url: "http://localhost:8000/api/users/users/"+response.data.pk+"/",
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

	render() {
		if (localStorage["user_key"] && localStorage["isLoggedIn"]==="true") {
			return <Redirect to="/home" />
		}
		const logoUrl = require(`../images/f81.jpeg`)
		return (
			<form onSubmit={this.handleSubmit} className="form-signin">
				<div className="form-group">
					<img className="logoimg" src={logoUrl} alt="placeholder logo" />
				</div>
				<div className="form-group">
					<input className="form-control" placeholder="Username" type="text" id="username" name="username" onChange={this.handleInput} />
				</div>
				<div className="form-group">
					<input className="form-control" placeholder="Email" type="text" id="email" name="email" onChange={this.handleInput} />
				</div>
				<div className="form-group">
					<input className="form-control" placeholder="Password" type="password" id="password1" name="password1" onChange={this.handleInput} />
				</div>
				<div className="form-group">
					<input className="form-control" placeholder="Verify Password" type="password" id="password2" name="password2" onChange={this.handleInput} />
				</div>
				<div className="form-group">
					<input className="form-control" placeholder="Company Id" type="text" id="company_id" name="company_id" onChange={this.handleInput} />
				</div>
        <div className="form-group">
					<input className="form-control" placeholder="Company Name" type="text" id="name" name="name" onChange={this.handleInput} />
				</div>
				<div className="form-group">
          <input className="form-control" placeholder="About Company" type="text" id="about" name="about" onChange={this.handleInput} />
				</div>
        <div className="form-group">
					<input className="form-control" placeholder="POC Phone Number" type="text" id="phone_number" name="phone_number" onChange={this.handleInput} />
				</div>
				<div className="form-group">
					<input className="form-control" placeholder="Additional POC" type="text" id="additional_poc" name="additional_poc" onChange={this.handleInput} />
				</div>
				<div className="form-group">
					<button className="btn btn-primary" id="loginbutton" type="submit">Register</button>
				</div>
			</form>
		);
	}
}

export default CreateCompany;