import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

import "../styles/login.css";

class AddJob extends Component{
    constructor() {
        super();
        this.formData = {};
        this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInput(event) {
        event.preventDefault();
        console.log(this.formData);
        this.formData[event.target.id] = event.target.value;
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.formData);
        axios({
            method: 'POST',
            url: "http://localhost:8000/api/users/jobs/",
            data:{
                job_name: this.formData.job_name,
                description: this.formData.description,
                skill: this.formData.skill,
                job_start_date: this.formData.job_start_date,
                job_duration: this.formData.job_duration,
                stipend: this.formData.stipend,
                language: this.formData.language,
                category: this.formData.category,
                company_id: sessionStorage["pk"],
            },
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response)=>{
            this.props.history.push("/jobs");
        })
        .catch(response => {
			console.log("Error");
			console.error(response);
		})
    }

    render() {
        if (sessionStorage["isLoggedIn"]==="false") {
            return <Redirect to="/login" />
        }

        if(sessionStorage["user_type"]==1){
            return <Redirect to="/jobs"/>
        }

        return(
            <form onSubmit={this.handleSubmit} className="form-signin">
                <div className="form-group">
                    <label className="col-sm-2 control-label ">
                        Job name
                    </label>
                    <div className="col-sm-10">
                        <input name="job_name" id="job_name" value={this.formData.job_name} className="form-control" type="text" onChange={this.handleInput}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label ">
                        Description
                    </label>
                    <div className="col-sm-10">
                        <input name="description" id="description" value={this.formData.description} className="form-control" type="text" onChange={this.handleInput}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label ">
                    Skill
                    </label>
                    <div className="col-sm-10">
                        <input name="skill" id="skill" value={this.formData.skill} className="form-control" type="text" onChange={this.handleInput}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label ">
                    Job start date
                    </label>
                    <div className="col-sm-10">
                        <input name="job_start_date" id="job_start_date" value={this.formData.job_start_date} className="form-control" type="date" onChange={this.handleInput}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label ">
                    Job duration
                    </label>
                    <div className="col-sm-10">
                        <input name="job_duration" id="job_duration" value={this.formData.job_duration} className="form-control" type="number" onChange={this.handleInput}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">
                    Stipend
                    </label>
                    <div className="col-sm-10">
                        <input name="stipend" id="stipend" value={this.formData.stipend} className="form-control" type="number" onChange={this.handleInput}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">
                    Language
                    </label>
                    <div className="col-sm-10">
                        <input name="language" id="language" value={this.formData.language} className="form-control" type="text" onChange={this.handleInput}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label ">
                    Category
                    </label>
                    <div className="col-sm-10">
                        <input name="category" id="category" value={this.formData.category} className="form-control" type="text" onChange={this.handleInput}/>
                    </div>
                </div>
                <button className="btn btn-primary" id="loginbutton" type="submit">Add Job</button>
            </form>
        )
    }

}

export default AddJob;