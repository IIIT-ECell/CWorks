import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';
import "../styles/home.css";

class Home extends Component {

  constructor() {
    super();
    this.state = {
      questions: [],
      q: [],
      replyView: false,
    };
  }

  componentDidMount(){
    axios({
      method: 'get',
      url: 'http://10.1.135.18:8000/api/users/jobs/',
    })
    .then((response)=>{
      console.log(response);
    })
  }

  render() {
    if (localStorage["isLoggedIn"]==="false") {
      return <Redirect to="/login" />
    }


    return (
      <div>
        <h1>HOME</h1>
      </div>
    );
  }
}

export default Home;
