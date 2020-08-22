import React, {useContext, useEffect} from 'react';
import Sidebar from '../layout/Sidebar';
import NavBar from '../layout/NavBar';
import TaskForm from '../tasks/TaskForm';
import TasksList from '../tasks/TasksList';
import Alert from '../alerts/Alert';
import alertContext from '../../context/alerts/alertContext';
import authContext from '../../context/authentication/authContext';

const ProjectsPage = () => {
    //Get state from 'AlertState.js'
    const alertsContext = useContext(alertContext);
    const { alert } = alertsContext;
    //Get state from 'AuthState.js'
    const authenticationContext = useContext(authContext);
    const { userAuthenticated } = authenticationContext;

    useEffect(()=> {
        /* Checking authentication */
        userAuthenticated();
        //eslint-disable-next-line
    }, []);

    return (
        <div className="contenedor-app">
            {/* PROJECTS SECTION */}
            <Sidebar />

            <div className="seccion-principal">
                <NavBar />

                {/* ALERT */}
                {alert ? <Alert/> : null}

                {/* TASKS SECTION */}
                <main>
                    <TaskForm />
                    <div className="contenedor-tareas">
                        <TasksList />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProjectsPage;