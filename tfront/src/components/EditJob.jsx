import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

import "../styles/login.css";

class EditJob extends Component{
    constructor() {
        super();
        this.state = {
            formData:{}
        }
        this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInput(event) {
        event.preventDefault();
        var temp_form = this.state.formData;
        temp_form[event.target.id] = event.target.value;
        this.setState({formData:temp_form});
        console.log(this.state.formData);
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.formData);
        axios({
            method: 'PUT',
            url: "http://localhost:8000/api/users/jobs/"+this.props.match.params.id+"/",
            data:{
                id: this.state.formData.id,
                job_name: this.state.formData.job_name,
                description: this.state.formData.description,
                skill: this.state.formData.skill,
                job_start_date: this.state.formData.job_start_date,
                job_duration: this.state.formData.job_duration,
                stipend: this.state.formData.stipend,
                language: this.state.formData.language,
                category: this.state.formData.category,
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

    componentDidMount(){
        var id = this.props.match.params.id;
        console.log(id);
        axios({
            method:"GET",
            url:"http://localhost:8000/api/users/jobs/"+id,
        })
        .then((response)=>{
            console.log(response.data);
            this.setState({formData:response.data}); 
            console.log(this.state);
        })
    }

    render() {
        if (sessionStorage["isLoggedIn"]==="false") {
            return <Redirect to="/login" />
        }

        if(sessionStorage["user_type"]==1){
            return <Redirect to="/jobs"/>
        }

        if(sessionStorage["pk"]!=this.props.match.params.company_id){
            return <Redirect to="/jobs"/>
        }

        return(
            <form onSubmit={this.handleSubmit} className="form-signin">
                <div className="form-group">
                    <label className="col-sm-2 control-label ">
                        Job name
                    </label>
                    <div className="col-sm-10">
                        <input name="job_name" id="job_name" value={this.state.formData.job_name} className="form-control" type="text" onChange={this.handleInput}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label ">
                        Description
                    </label>
                    <div className="col-sm-10">
                        <input name="description" id="description" value={this.state.formData.description} className="form-control" type="text" onChange={this.handleInput}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label ">
                    Skill
                    </label>
                    <div className="col-sm-10">
                        <input name="skill" id="skill" value={this.state.formData.skill} className="form-control" type="text" onChange={this.handleInput}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label ">
                    Job start date
                    </label>
                    <div className="col-sm-10">
                        <input name="job_start_date" id="job_start_date" value={this.state.formData.job_start_date} className="form-control" type="date" onChange={this.handleInput}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label ">
                    Job duration
                    </label>
                    <div className="col-sm-10">
                        <input name="job_duration" id="job_duration" value={this.state.formData.job_duration} className="form-control" type="number" onChange={this.handleInput}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">
                    Stipend
                    </label>
                    <div className="col-sm-10">
                        <input name="stipend" id="stipend" value={this.state.formData.stipend} className="form-control" type="number" onChange={this.handleInput}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">
                    Language
                    </label>
                    <div className="col-sm-10">
                        <input name="language" id="language" value={this.state.formData.language} className="form-control" type="text" onChange={this.handleInput}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label ">
                    Category
                    </label>
                    <div className="col-sm-10">
                        <input name="category" id="category" value={this.state.formData.category} className="form-control" type="text" onChange={this.handleInput}/>
                    </div>
                </div>
                <button className="btn btn-primary" id="loginbutton" type="submit">Add Job</button>
            </form>
        )
    }

}

export default EditJob;