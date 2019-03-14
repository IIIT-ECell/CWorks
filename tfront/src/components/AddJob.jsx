import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

import "../styles/login.css";

class AddJob extends Component{
    constructor() {
        super();
        this.formData = {};
    }
    handleInput(event) {
        event.preventDefault();
        this.formData[event.target.id] = event.target.value;
    }

    handleSubmit(){

    }

    render() {
        if (sessionStorage["isLoggedIn"]==="false") {
            return <Redirect to="/login" />
        }

        if(sessionStorage["user_type"]==1){
            return <Redirect to="/jobs"/>
        }

        return(
            <form onSubmit={this.handleInput} className="form-signin">
                <div className="form-group ">
                    <label className="col-sm-2 control-label ">
                        Job name
                    </label>
                    <div className="col-sm-10">
                        <input name="job_name" className="form-control" type="text"/>
                    </div>
                </div>
                <div className="form-group ">
                    <label className="col-sm-2 control-label ">
                        Description
                    </label>
                    <div className="col-sm-10">
                    </div>
                </div>
                <div className="form-group ">
                    <label className="col-sm-2 control-label ">
                    Skill
                    </label>
                    <div className="col-sm-10">
                        <input name="skill" className="form-control" type="text"/>
                    </div>
                </div>
                <div className="form-group ">
                    <label className="col-sm-2 control-label ">
                    Job start date
                    </label>
                    <div className="col-sm-10">
                        <input name="job_start_date" className="form-control" type="date"/>
                    </div>
                </div>
                <div className="form-group ">
                    <label className="col-sm-2 control-label ">
                    Job duration
                    </label>
                    <div className="col-sm-10">
                        <input name="job_duration" className="form-control" type="number"/>
                    </div>
                </div>
                <div className="form-group ">
                    <label className="col-sm-2 control-label ">
                    Stipend
                    </label>
                    <div className="col-sm-10">
                        <input name="stipend" className="form-control" type="number"/>
                    </div>
                </div>
                <div className="form-group ">
                    <label className="col-sm-2 control-label ">
                    Language
                    </label>
                    <div className="col-sm-10">
                        <input name="language" className="form-control" type="text"/>
                    </div>
                </div>
                <div className="form-group ">
                    <label className="col-sm-2 control-label ">
                    Category
                    </label>
                    <div className="col-sm-10">
                        <input name="category" className="form-control" type="text"/>
                    </div>
                </div>
                <div className="form-actions">
                    <button className="btn btn-primary" type="submit" title="Make a POST request on the Job List resource">POST</button>
                </div>

            </form>
        )
    }

}

export default AddJob;