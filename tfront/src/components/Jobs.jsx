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
    this.JobSort = this.JobSort.bind(this);
  }

  JobSort(event){
    console.log(event.target.value);
    if("stipend_desc"==event.target.value){
      let temp_jobs = this.state.jobs;
      temp_jobs.sort((a,b)=>{
        return b["stipend"]-a["stipend"];
      });
      this.setState({jobs:temp_jobs});
    }
  }

  componentDidMount(){
    axios({
      method: 'get',
      url: 'http://localhost:8000/api/users/jobs/',
    })
    .then((response)=>{
      console.log(response.data);
      this.setState({ jobs : response.data });
      console.log(this.state.jobs);
      for(let i in this.state.jobs){
        axios({
          method: 'get',
          url: 'http://localhost:8000/api/users/companies/'+ this.state.jobs[i].company_id +'/',
        })
        .then((res)=>{
          let temp_jobs = this.state.jobs;
          temp_jobs[i]["company_name"] = res.data.name;
          this.setState({ jobs:temp_jobs });
        })
      }
    })
  }

  render() {
    if (sessionStorage["isLoggedIn"]==="false") {
      return <Redirect to="/login" />
    }


    return (
      <div>
        <h1>JOBS</h1>
        <select onChange={this.JobSort}>
          <option value="random">Random</option>
          <option value="stipend_desc">Most Paying</option>
        </select>
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
              <th scope="col">Skill</th>
              <th scope="col">Company</th>
            </tr>
          </thead>
          <tbody id="job_table_body">
          {this.state.jobs.map((item,key)=>{
            return (
              <tr key={item.id}>
                <td>{item.job_name}</td>
                <td>{item.description}</td>
                <td>{item.job_start_date}</td>
                <td>{item.job_duration} Month</td>
                <td>{item.stipend}</td>
                <td>{item.language}</td>
                <td>{item.category}</td>
                <td>{item.skill}</td>
                <td>{item.company_name}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Home;
