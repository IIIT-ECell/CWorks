import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import User from './User';

import axios from 'axios';

import "../styles/home.css";

class Home extends Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      key: "",
      questions: [],
      q: [],
      replyView: false,
    };
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

  }

  render() {
    if (!this.props.getKey) {
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
