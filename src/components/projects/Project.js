import React, {useContext} from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Project = ({project}) => {
    //Get state from 'ProjectState.js'
    const projectsContext = useContext(projectContext);
    const { currentProject } = projectsContext;
    //Get state from 'TaskState.js'
    const tasksContext = useContext(taskContext);
    const { getTasks, unselectTask } = tasksContext;

    /**
     * @name:selectProject.
     * @description:executes functions obtained from each context when a project is selected.
     * @param:Project id.
    */
    const selectProject = (id) => {
        //Set project as current
        currentProject(id);
        //Get tasks from the current project
        getTasks(id);
        //Refresh task form
        unselectTask();
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={()=> selectProject(project._id)}
            >
               <i className="far fa-circle"></i> {project.name}
            </button>
        </li>
    );
};

export default Project;