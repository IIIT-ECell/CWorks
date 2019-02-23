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
      url: 'http://localhost:8000/api/users/jobs/',
    })
    .then((response)=>{
      console.log(response);
    })
  }

  render() {
    if (sessionStorage["isLoggedIn"]==="false") {
      return <Redirect to="/login" />
    }


    return (
      <div>
        {console.log(this.state)}
        <h1>HOME</h1>
  	    {console.log(this.state.q)}
      </div>
    );
  }
}

export default Home;
