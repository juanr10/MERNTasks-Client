import React, {useContext} from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Task = ({task}) => {
    //Get state from 'ProjectState.js'
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;
    //Get state from 'TaskState.js'
    const tasksContext = useContext(taskContext);
    const { deleteTask, getTasks, editTask, currentTask } = tasksContext;

    /**
     * @name:TaskDelete.
     * @description:executes deleteTask() from 'TaskState.js'.
     * @param:Task id to delete.
    */
    const taskDelete = (taskId) => {
        deleteTask(taskId, project[0]._id);

        //Refresh tasks list
        getTasks(project[0]._id);
    }

    /**
     * @name:changeStatus
     * @description:updates a task & executes editTask() from 'TaskState.js'.
     * @param:Task to edit.
    */
    const changeStatus = (task) =>{
        if(task.status){
            task.status = false;
        } else {
            task.status = true;
        }

        editTask(task);
    }

    /**
     * @name:selectTask.
     * @description:executes currentTask() from 'TaskState.js'.
     * @param:Task object.
    */
    const selectTask = (task) => {
        currentTask(task);
    }

    return (
        <li className="tarea sombra">
            <p>{task.name}</p>
            
            <div className="estado">
                {
                    task.status
                    ? 
                    (   <button
                            type="button"
                            className="completo"
                            onClick={() => changeStatus(task)}
                        >
                            Completa
                        </button>
                    )
                    : 
                    (   <button
                            type="button"
                            className="incompleto"
                            onClick={() => changeStatus(task)}
                        >
                            Incompleta
                        </button>
                    )
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={()=>selectTask(task)}
                >
                    <i className="fas fa-edit"></i>
                    {/* Edit */}
                </button>

                <button type="button"
                    className="btn btn-terciario-inline"
                    onClick={()=>taskDelete(task._id)}
                >
                    <i className="fas fa-trash-alt"></i>
                    {/* Delete */}
                </button>
            </div>
        </li>
    );
};

export default Task;