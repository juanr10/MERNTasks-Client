import React, {Fragment,useContext, useEffect} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Image from '../../images/vacio.png';
import Project from './Project';
import projectContext from '../../context/projects/projectContext';
import alertContext from '../../context/alerts/alertContext';

const ProjectsList = () => {
    //Get state from 'ProjectState.js'
    const projectsContext = useContext(projectContext);
    const { projects, message, getProjects } = projectsContext;
    //Get state from 'AlertState.js'
    const alertsContext = useContext(alertContext);
    const { showAlert } = alertsContext;

    useEffect(() => {
        if(message){
            showAlert(message.msg, message.category);
        }

        getProjects();

        //eslint-disable-next-line
    }, [message]);

    //The user has no project.
    if(projects.length === 0) return (
        <Fragment>
            <img src={Image} className="imagen2" alt="empty-board"/>
            <h3>No tienes proyectos.</h3>
        </Fragment>
    );

    return (
        <ul className="listado-proyectos">
            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project._id}
                        timeout={600}
                        classNames="proyecto"
                    >
                        <Project project={project} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
};

export default ProjectsList;