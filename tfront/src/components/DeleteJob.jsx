import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

import "../styles/login.css";

class DeleteJob extends Component{
    constructor(){
        super();
        this.state={};
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleDelete(){
        if(this.state.job.company_id==sessionStorage["pk"]){
            axios({
                method:'DELETE',
                url:"http://localhost:8000/api/users/jobs/"+this.props.match.params.id,
            })
            .then((response)=>{
                this.props.history.push("/jobs");
            })
        }
        else{
            this.props.history.push("/jobs");
        }
    }
    componentWillMount(){
        axios({
            method:'GET',
            url:"http://localhost:8000/api/users/jobs/"+this.props.match.params.id,
        })
        .then((response)=>{
            this.setState({job:response.data}); 
        })
    }

    render(){
        return(<div className="col-md-12">
            <h1>Note that the process of deletion is irreparable. Think twice before you act.</h1>
            <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
        </div>)
    }
}

export default DeleteJob;