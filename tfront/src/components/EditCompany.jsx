import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import axios from 'axios';
import "../styles/home.css";

class EditCompany extends Component{
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
            url: 'https://abhigyanghosh30.pythonanywhere.com/api/rest-auth/user',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token ' + localStorage["user_key"],
              'Access-Control-Allow-Origin':'https://abhigyanghosh30.pythonanywhere.com',
            }
        })
        .then((response)=>{
            console.log(response);
            axios({
                method: 'GET',
                url: 'https://abhigyanghosh30.pythonanywhere.com/api/users/users/' + response.data.pk,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'https://abhigyanghosh30.pythonanywhere.com',
                },
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
                    url: 'https://abhigyanghosh30.pythonanywhere.com/api/users/comptest/' + response.data.id,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin':'https://abhigyanghosh30.pythonanywhere.com',
                    },
                })
                .then((response)=>{
                    console.log(response.data);
                    let temp_user = this.state.user;
                    for(var i in response.data[0]){
                        temp_user[i] = response.data[0][i]; 
                    }
                    this.setState({user:temp_user});
                    console.log(this.state);
                })
            })
        })
    }

    handleInput(event) {
        event.preventDefault();
        console.log(this.state);
        var temp_user = this.state.user;
        temp_user[event.target.id]=event.target.value;
        this.setState({user:temp_user});
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.user.name);
        console.log(this.state.user.company_id);
        console.log(this.state.user.about);
        console.log(this.state.user.additional_poc);
        console.log(localStorage["pk"]);
        axios({
            method:"PUT",
            url:"https://abhigyanghosh30.pythonanywhere.com/api/users/companies/"+this.state.user.id+"/",
            data:{
                id:this.state.user.id,
                name: this.state.user.name,
                company_id: this.state.user.company_id,
                about: this.state.user.about,
                additional_poc: this.state.user.additional_poc,
                user:localStorage["pk"],
            },
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'https://abhigyanghosh30.pythonanywhere.com',
            },
        })
        .then((response)=>{
            this.props.history.push('/profile');
        })

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
                    <label className="col-sm-2 control-label ">About</label>
                    <div className="col-sm-10">
                        <input name="about" id="about" className="form-control" type="text" onChange={this.handleInput} value={this.state.user.about}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label ">Additional POC</label>
                    <div className="col-sm-10">
                        <input name="additional_poc" id="additional_poc" className="form-control" type="text" onChange={this.handleInput} value={this.state.user.additional_poc}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Phone Number</label>
                    <div className="col-sm-10">
                        <input name="phone_number" id="phone_number" className="form-control" type="text" onChange={this.handleInput} value={this.state.user.phone_number}/>
                    </div>
                </div>
                <div className="form-group">
					<button className="btn btn-primary" id="loginbutton" type="submit">Edit</button>
				</div>
            </form>
        )

    }

}

export default EditCompany;