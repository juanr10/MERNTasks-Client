import React, {Fragment, useContext} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import Image from '../../images/todolist.png';
import Task from './Task';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const TasksList = () => {
    //Get state from 'ProjectState.js'
    const projectsContext = useContext(projectContext);
    const { project, deleteProject } = projectsContext;
    //Get state from 'TaskState.js'
    const tasksContext = useContext(taskContext);
    const { projectTasks } = tasksContext;

    //No project selected
    if(!project) return (
        <div className="proyectos"> 
            <h2><i className="fas fa-exclamation-circle"></i> Selecciona un proyecto para empezar.</h2>
            <img className="imagen" src={Image} alt="to-do-list"/>
        </div> 
    );

    //Get current project from the project context array 
    const [currentProject] = project;

    return (
        <Fragment>
            <h2><i className="fas fa-folder"></i> Proyecto: {currentProject.name}</h2>
            
            <ul className="listado-tareas">
                {   projectTasks.length === 0
                    ? (<li className="tarea sombra"><h3><i className="fas fa-exclamation-circle"></i> Aún no hay tareas asignadas.</h3></li>)
        
                    :   <TransitionGroup>
                            {projectTasks.map(task => (
                                <CSSTransition 
                                    key={task._id}
                                    timeout={600}
                                    classNames="tarea"
                                >
                                    <Task task = {task} />
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                }
            </ul>

            <button
                type="button"
                className="btn btn-borrar"
                onClick={() => deleteProject(currentProject._id)}
            >
                <i className="far fa-trash-alt"></i> Eliminar proyecto
            </button>
        </Fragment>
    );
};

export default TasksList;