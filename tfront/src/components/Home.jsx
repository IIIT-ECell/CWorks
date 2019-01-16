import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

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
