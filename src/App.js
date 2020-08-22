import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import tokenAuth from './config/tokenAuth';
import PrivateRoute from './components/routes/PrivateRoute';
/* COMPONENTS */
import Login from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import ProjectsPage from './components/projects/ProjectsPage';
/* CONTEXTS */
import ProjectState from './context/projects/ProjectState';
import TaskState from './context/tasks/TaskState';
import AlertState from './context/alerts/AlertState';
import AuthState from './context/authentication/AuthState';

/**
 * @name: MERNTasks.
 * @description: App made with React (functionality based on useContext and useReducer) using: react-transition-group, sweet-alert2 & MERN stack(Server API).
 * @author: Juan Argudo.
 * @version: 22/05/2020.
*/

/* Check if there is an access token to the application */
const token = localStorage.getItem('token');
if(token){
  //Setting the acess token in the header.
  tokenAuth(token);
}

function App() {
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/new-account" component={NewAccount} />
                {/* Protected component: 'PrivateRoute.js' */}
                <PrivateRoute exact path="/projects-page" component={ProjectsPage} />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
