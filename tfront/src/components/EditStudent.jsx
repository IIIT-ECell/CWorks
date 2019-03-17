import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import axios from 'axios';
import "../styles/home.css";

class EditStudent extends Component{
    constructor(){
        super();
        this.state = {
            user: {},
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){
        axios({
            method: 'GET',
            url: 'http://localhost:8000/api/rest-auth/user',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token ' + localStorage["user_key"],
            }
        })
        .then((response)=>{
            console.log(response);
            axios({
                method: 'GET',
                url: 'http://localhost:8000/api/users/users/' + response.data.pk,
            })
            .then((response)=>{
                console.log(response.data);
                let temp_state = this.state.user;
                for(var i in response.data){
                    temp_state[i] = response.data[i]; 
                }
                this.setState({user:temp_state});
                console.log(this.state);

                axios({
                    method: 'GET',
                    url: 'http://localhost:8000/api/users/students/' + response.data.id,
                })
                .then((response)=>{
                    console.log(response.data);
                    let temp_user = this.state.user;
                    for(var i in response.data){
                        temp_user[i] = response.data[i]; 
                    }
                    this.setState({user:temp_user});
                    console.log(this.state);
                })
            })
        })
    }

    handleInput(event) {
        event.preventDefault();
        console.log(this.formData);
        this.formData[event.target.id] = event.target.value;
    }

    handleSubmit(event){
        event.preventDefault();
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit} className="form-signin">
                <div className="form-group">
                    <label className="col-sm-2 control-label ">Name</label>
                    <div className="col-sm-10">
                        <input name="name" id="name" className="form-control" type="text" onChange={this.handleInput} value={this.state.user.name}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label ">Roll Number</label>
                    <div className="col-sm-10">
                        <input name="student_id" id="student_id" className="form-control" type="number" onChange={this.handleInput} value={this.state.user.student_id}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label ">Nationality</label>
                    <div className="col-sm-10">
                        <input name="nationality" id="nationality" className="form-control" type="text" onChange={this.handleInput} value={this.state.user.nationality}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Phone Number</label>
                    <div className="col-sm-10">
                        <input name="phone_number" id="phone_number" className="form-control" type="text" onChange={this.handleInput} value={this.state.user.phone_number}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">City of Residence</label>
                    <div className="col-sm-10">
                        <input name="permanent_city" id="permanent_city" className="form-control" type="text" onChange={this.handleInput} value={this.state.user.permanent_city_res}/>
                    </div>
                </div>
            </form>
        )

    }

}

export default EditStudent;