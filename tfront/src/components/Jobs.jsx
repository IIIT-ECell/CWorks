import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    if("job_date_asc"==event.target.value){
      let temp_jobs = this.state.jobs;
      temp_jobs.sort((a,b)=>{
        var date_a = new Date(a["job_start_date"].split('-')[0],a["job_start_date"].split('-')[1],a["job_start_date"].split('-')[2]);
        var date_b = new Date(b["job_start_date"].split('-')[0],b["job_start_date"].split('-')[1],b["job_start_date"].split('-')[2]);
        console.log(date_a);
        console.log(date_b);
        console.log(date_a>date_b);
        return date_b.getTime()-date_a.getTime();
      });
      this.setState({jobs:temp_jobs});
    }
  }

  componentDidMount(){
    axios({
      method: 'get',
      url: 'http://abhigyanghosh30.pythonanywhere.com/api/users/jobs/',
    })
    .then((response)=>{
      console.log(response.data);
      this.setState({ jobs : response.data });
      console.log(this.state.jobs);
      for(let i in this.state.jobs){
        axios({
          method: 'get',
          url: 'http://abhigyanghosh30.pythonanywhere.com/api/users/companies/'+ this.state.jobs[i].company_id +'/',
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
    if (localStorage["isLoggedIn"]==="false") {
      return <Redirect to="/login" />
    }


    return (
      <div>
        <h1>JOBS</h1>
        <div className="row">
          <form className="col-md-6">
            <select onChange={this.JobSort} className="form-control">
              <option value="random">Random</option>
              <option value="stipend_desc">Most Paying</option>
              <option value="job_date_asc">Latest</option>
            </select>
          </form>

          { localStorage["user_type"]==2 && <div className="col-md-6 text-center">
            <a href="/jobs/add"><FontAwesomeIcon icon="plus"/></a>
          </div>}
        </div>
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
              { localStorage["user_type"]==2 && <th scope="col">Edit</th>}
              { localStorage["user_type"]==2 && <th scope="col">Delete</th>}
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
                <td><a href={"/profile/"+item.company_id}>{item.company_name}</a></td>
                { localStorage["user_type"] == 2 && <td><a href={"/jobs/edit/"+item.company_id+"/"+item.id}><FontAwesomeIcon icon="edit"/></a></td>
                }
                { localStorage["user_type"] == 2 && <td><a href={"/jobs/delete/"+item.id}><FontAwesomeIcon icon="trash"/></a></td>}
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
