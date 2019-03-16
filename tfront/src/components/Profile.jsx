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

      axios({
        method: 'GET',
        url: 'http://localhost:8000/api/users/students/' + response.data.pk,
      })
      .then((res)=>{
        let temp_user = this.state.user;
        for(let j in res.data){
          temp_user[j] = res.data[j];
        }
        this.setState({user: temp_user});
        console.log(this.state);
      })
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
    return (
      <div>
        {console.log(this.state)}
        <div className="topFreeze">
          <h1>PROFILE</h1>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-3 profile">
            <Gravatar name={this.state.user.name} size={200}/>
          </div>
          <div className="col-sm-12 col-md-9">
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
}

export default Profile;
