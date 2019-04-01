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
      url: 'https://abhigyanghosh30.pythonanywhere.com/api/users/jobs/',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'https://abhigyanghosh30.pythonanywhere.com',
      },
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
