import React, { Component } from 'react';
import ProjectTask from './ProjectTasks/ProjectTask';
//marco
import {logout } from "../../actions/securityActions";
import jwt_decode from "jwt-decode";
import store from "../../store";

const jwtToken = localStorage.jwtToken;

if(jwtToken){
  //setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
 /* store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });
*/
  const currentTime = Date.now()/1000;
  if(decoded_jwtToken.exp < currentTime){
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class Backlog extends Component {
    render() {
        const {project_tasks_prop} = this.props;
        const tasks = project_tasks_prop.map(project_task => (
            <ProjectTask key={project_task.id} project_task = {project_task} /> 
        ));

        let todoItems = [];
        let inProgressItems = [];
        let doneItems = [];

        for(let i=0; i<tasks.length; i++){
            if(tasks[i].props.project_task.status === "TO_DO"){
                todoItems.push(tasks[i]);
            }
            if(tasks[i].props.project_task.status === "IN_PROGRESS"){
                inProgressItems.push(tasks[i]);
            }
            if(tasks[i].props.project_task.status === "DONE"){
                doneItems.push(tasks[i]);
            }
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-secondary text-white">
                                <h3>TO DO</h3>
                            </div>
                        </div>
                        {todoItems}
                        {
                            //insert tasks here
                        }
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-primary text-white">
                                <h3>In Progress</h3>
                            </div>
                        </div>
                        {inProgressItems}
                        {
                            //<!-- SAMPLE PROJECT TASK STARTS HERE -->

                            //<!-- SAMPLE PROJECT TASK ENDS HERE -->
                        }
                        
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-success text-white">
                                <h3>Done</h3>
                            </div>
                        </div>
                        {doneItems}
                        {
                            //<!-- SAMPLE PROJECT TASK STARTS HERE -->

                            //<!-- SAMPLE PROJECT TASK ENDS HERE -->
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Backlog;