import React, {useState, useContext, useEffect} from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const TaskForm = () => {
    //Get state from 'ProjectState.js'
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;
    //Get state from 'TaskState.js'
    const tasksContext = useContext(taskContext);
    const { selectedTask, taskError, getTasks, addTask, taskValidation, editTask, unselectTask } = tasksContext;

    //Checking if there is a task selected
    useEffect(() => {
        if(selectedTask !== null){
            saveTask(selectedTask);
        } else {
            saveTask({ 
                name: ''
            });
        }
    }, [selectedTask])


    //Form state
    const [task, saveTask] = useState({
        name: ''
    });

    const {name} = task;

    //No project selected
    if(!project) return null;

    //Get current project from the project context array 
    const [currentProject] = project;

    /**
     * @name:handleChange.
     * @description:read the data from an input and stores it in the state.
     * @param:event e.
    */
    const handleChange = (e) => {
        saveTask({
            ...task,
            [e.target.name] : e.target.value
        })
    }

    /**
     * @name:handleSubmit.
     * @description:validate data & executes addTask() from 'TaskState.js'.
     * @param:event e.
    */
    const handleSubmit = (e) => {
        e.preventDefault();

        if(name.trim() === ''){
            taskValidation();
            return;
        }

        //Check if the user is adding or editing a task
        if(selectedTask === null){
            //Add task to 'TaskState.js'
            task.project = currentProject._id;
            addTask(task);
            
        } else{
            //Edit task
            editTask(task);
            //Clean the task of the state
            unselectTask();
        }

        //Get tasks from the current project(refresh)
        getTasks(currentProject._id);

        //Clean form
        saveTask({
            name: ''
        });
    }

    return (
        <div className="formulario">
            <form onSubmit={handleSubmit}>
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre de la tarea"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
            {/* BUTTON */}
                    { selectedTask 
                        ? 
                            <div className="formulario-seccion-botones">
                                <button
                                    type="submit"
                                    className="btn btn-primario btn-submit"
                                >
                                    <i className="far fa-edit"></i> Editar tarea
                                </button>

                                <button type="button"
                                    className="btn btn-terciario-inline"
                                    onClick={() => unselectTask()}
                                >
                                    Cancelar
                                </button>
                            </div> 
                        :
                            <button
                                type="submit"
                                className="btn btn-primario btn-submit btn-block"
                            >
                                <i className="fas fa-plus-circle"></i>  Agregar tarea
                            </button>
                    }
            </form>
        {/* ERROR MESSAGE */}
            {taskError ? <p className="mensaje error"><i className="fas fa-exclamation-circle"></i> Introduce un nombre.</p> : null}
        </div>
    );
};

export default TaskForm;