import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';
import Gravatar from 'react-gravatar';

import "../styles/user.css";

class CompanyProfile extends Component {

  constructor() {
    super();
    this.state = {
      user: {},
    };
    this.getDetails = this.getDetails.bind(this);
  }

  getDetails() {
    axios({
      method: 'GET',
      url: 'https://abhigyanghosh30.pythonanywhere.com/api/users/companies/' + this.props.match.params.company_id+"/",
    })
    .then((response)=>{
      console.log("comptest");
      console.log(response.data);
      var temp_user = this.state.user;
      for(var j in response.data){
        temp_user[j] = response.data[j];
      }
      this.setState({user:temp_user});
      axios({
        method:'GET',
        url:'https://abhigyanghosh30.pythonanywhere.com/api/users/users/' + this.state.user.user
      })
      .then((response)=>{
        var new_user = this.state.user;
        for(var i in response.data){
          new_user[i] = response.data[i];
        }
        this.setState({user:new_user});
      })
    });
  }

  componentDidMount() {
    this.getDetails();
  }

  render() {
    return (
      <div>
        {console.log(this.state)}
        <div className="topFreeze">
          <h1>COMPANY PROFILE</h1>
        </div>
        <div className="row">
          <div className="col-sm-12 text-center">
            <p>Name: {this.state.user.name}</p>
            <p>Company Id: {this.state.user.company_id}</p>
            <p>About: {this.state.user.about}</p>
            <p>Phone Number: {this.state.user.phone_number}</p>
            <p>Additional POC: {this.state.user.additional_poc}</p>
            <p>Email: {this.state.user.email}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyProfile;
