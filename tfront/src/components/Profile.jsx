import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

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
    let token = 'Token '+ this.state.key;
    axios({
      method: 'get',
      url: 'http://localhost:8000/api/rest-auth/user/',
      headers: {'Authorization': token}
    })
    .then((response)=>{
      console.log(response);
      return response;
    })
    .then((response)=>{
      axios({
        method: 'GET',
        url: 'http://localhost:8000/api/users/users/' + response.data.pk,
        headers: {'Authorization': token}
      })
      .then((res)=>{
        console.log(res);
        return res;
      })
      .then((res)=>{
        let temp_user = this.state.user;
        for(let i in temp_user){
          temp_user[i] = res.data[i];
        }
        this.setState({user: temp_user});
      })

      axios({
        method: 'GET',
        url: 'http://localhost:8000/api/users/students/' + response.data.pk,
      })
      .then((res)=>{
        let temp_user = this.state.user;
        for(let j in temp_user){
          temp_user[j] = res.data[j];
        }
        this.setState({user: temp_user});
      })
    })
  }

  componentWillMount() {
    this.setState({ isLoggedIn: sessionStorage["isLoggedIn"], key: sessionStorage["user_key"] });
    console.log(this.state);
  }

  componentDidMount() {
    this.getDetails();
    console.log("State:");
    console.log(this.state);
    console.log(this.state);
  }

  render() {
    return (
      <div>
        {console.log(this.state)}
        <div className="topFreeze">
          <h1>PROFILE</h1>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-3 profile">
            <Gravatar email={this.state.user.email} size={200}/>
          </div>
          <div className="col-sm-12 col-md-9">
            <p>Name: {this.state.user.name}</p>
            <p>Username: {this.state.user.username}</p>
            <p>Email ID: {this.state.user.email}</p>
            <p>Bio: {this.state.user.bio}</p>
            <p>School: {this.state.user.school}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12"><h1>STATISTICS</h1></div>
          <div class="col-sm-12 col-md-6">Average Rating received: {this.state.user.average_rating_received}</div>
          <div class="col-sm-12 col-md-6">Average Rating given: {this.state.user.average_rating_given}</div>
        </div>


      </div>
    );
  }
}

export default Profile;
