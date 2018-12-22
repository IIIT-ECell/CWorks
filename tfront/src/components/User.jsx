import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';
import Gravatar from 'react-gravatar';

import "../styles/user.css";

class User extends Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      key: "",
      uid: 0,
      user: {},
    };
    this.getDetails = this.getDetails.bind(this);
  }

  getDetails() {
    let token = 'Token '+ this.state.key;
    let _url = 'http://localhost:8000/api/users/users/' + this.state.uid.id;
    axios({
      method: 'get',
      url: _url,
      headers: {'Authorization': token}
    })
    .then((response)=>{
      console.log(response);
      return response;
    })
    .then((response)=>{
      this.setState({user: response.data});
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isLoggedIn: nextProps.getMark,});
    this.state.key = nextProps.getKey;
    console.log('Props received at Login');
    console.log(this.state);
  }

  componentWillMount() {
    this.state.isLoggedIn = this.props.getMark;
    this.state.key = this.props.getKey;
    console.log(this.state);
  }

  componentDidMount() {
    this.state.uid = this.props.match.params;
    console.log(this.state.uid);
    this.getDetails();
  }

  render() {
    if (!this.props.getKey) {
      return <Redirect to="/home" />
    }
    return (
      <div>
        {console.log(this.state)}
        <div className="topFreeze">
          <h1>USER</h1>
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

export default User;
