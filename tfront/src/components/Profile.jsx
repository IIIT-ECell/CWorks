import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import axios from 'axios';
import Gravatar from 'react-gravatar';

class Profile extends Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      key: "",
      user: {},
    };

    this.getDetails = this.getDetails.bind(this);
  }

  getDetails() {
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
      .then((res)=>{
        console.log(res);
        return res;
      })
      .then((res)=>{
        let temp_user = this.state.user;
        for(let i in res.data){
          temp_user[i] = res.data[i];
        }
        this.setState({user: temp_user});
        console.log(this.state);
      });

      if(localStorage["user_type"]==1){  
        axios({
          method: 'GET',
          url: 'http://localhost:8000/api/users/stutest/' + localStorage["pk"],
        })
        .then((res)=>{
          let temp_user = this.state.user;
          for(let j in res.data[0]){
            temp_user[j] = res.data[0][j];
          }
          this.setState({user: temp_user});
          console.log(this.state);
        })
      }
      else{
        axios({
          method: 'GET',
          url: 'http://localhost:8000/api/users/comptest/' + response.data.pk,
        })
        .then((res)=>{
          let temp_user = this.state.user;
          for(let j in res.data[0]){
            temp_user[j] = res.data[0][j];
          }
          this.setState({user: temp_user});
          console.log(this.state);
        })
      }
    });
  }

  componentWillMount() {
    this.setState({ isLoggedIn: localStorage["isLoggedIn"], key: localStorage["key"] });
    console.log(this.state);
  }

  componentDidMount() {
    this.getDetails();
    console.log("State:");
    console.log(this.state);
    console.log(this.state);
  }

  render() {
    if(localStorage["user_type"]==1){
      return (
        <div>
          {console.log(this.state)}
          <div className="topFreeze">
            <h1>STUDENT PROFILE</h1>
          </div>
          <div className="row">
            <div className="col-sm-6 text-right">
              <a href="/profile/students/edit"><FontAwesomeIcon icon="edit"/></a>
            </div>
            <div className="col-sm-12 text-center">
              <p>Name: {this.state.user.name}</p>
              <p>Roll Number: {this.state.user.student_id}</p>
              <p>Nationality: {this.state.user.nationality}</p>
              <p>Phone Number: {this.state.user.phone_number}</p>
              <p>City of Residence: {this.state.user.permanent_city_res}</p>
            </div>
          </div>
        </div>
      );
    }
    else{
      return (
        <div>
          {console.log(this.state)}
          <div className="topFreeze">
            <h1>COMPANY PROFILE</h1>
          </div>
          <div className="row">
            <div className="col-sm-6 text-right">
              <a href="/profile/companies/edit"><FontAwesomeIcon icon="edit"/></a>
            </div>
            <div className="col-sm-12 text-center">
              <p>Name: {this.state.user.name}</p>
              <p>Company Id: {this.state.user.company_id}</p>
              <p>About: {this.state.user.about}</p>
              <p>Phone Number: {this.state.user.phone_number}</p>
              <p>Additional POC: {this.state.user.additional_poc}</p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Profile;
