import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';
import "../styles/home.css";

class Home extends Component {

  constructor() {
    super();
    this.state = {
      jobs:[]
    };
  }

  componentDidMount(){
    axios({
      method: 'get',
      url: 'http://localhost:8000/api/users/jobs/',
    })
    .then((response)=>{
      this.setState({jobs:response.data});
      console.log(this.state.jobs);

    })
  }

  render() {
    if (sessionStorage["isLoggedIn"]==="false") {
      return <Redirect to="/login" />
    }


    return (
      <div>
        <h1>JOBS</h1>
        <table className="table" id="jobs_table">
          <thead>
            <tr>
              <th scope="col">Job Name</th>
              <th scope="col">Description</th>
              <th scope="col">Start Date</th>
              <th scope="col">Duration</th>
              <th scope="col">Stipend</th>
              <th scope="col">Language</th>
              <th scope="col">Category</th>
              <th scope="col">Company</th>
            </tr>
          </thead>
          <tbody id="job_table_body">
          {this.state.jobs.map((name,index)=>{
            return <li key="index">{name}</li>;
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Home;
