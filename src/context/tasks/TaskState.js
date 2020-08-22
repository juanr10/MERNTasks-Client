import React, {useReducer} from 'react';
import taskContext from './taskContext';
import taskReducer from './taskReducer';
import clientAxios from '../../config/axios';

import {TASKS_PROJECT,
        ADD_TASK,
        TASK_VALIDATION,
        DELETE_TASK,
        CURRENT_TASK,
        EDIT_TASK,
        UNSELECT_TASK
} from '../../types';

const TaskState = (props) => {
    const initialState = {
        projectTasks: [],
        taskError: false,
        selectedTask: null
    }

    const [state, dispatch] = useReducer(taskReducer, initialState);

    /**
     * @name:getTasks.
     * @description:Filter all tasks by project id.
     * @param:Project id.
     * @return:Array of tasks filtered by project id.
    */
    const getTasks = async (project) => {
        try {
            const result = await clientAxios.get('api/tasks', {params: { project }});
   
            dispatch({
                type: TASKS_PROJECT,
                payload: result.data.tasks
            })

        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @name:addTask.
     * @description:Add a task to DB.
     * @param:Task object.
     * @return:?
    */
    const addTask = async (task) => {
        try {
            const result = await clientAxios.post('api/tasks', task);

            dispatch({
                type: ADD_TASK,
                payload: result.data
            })
            
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @name:taskValidation.
     * @description:Change state.taskError to true. 
     * @param:none.
    */
    const taskValidation = () => {
        dispatch({
            type: TASK_VALIDATION
        })
    }

    /**
     * @name:deleteTask.
     * @description:Updates state.tasks filtering tasks by the id of the task to delete.
     * @param:Task id to delete & task project (id).
     * @return:Return an array of tasks without the task with the id that has been passed.
    */
    const deleteTask = async (taskId, project) => {
        try {
            await clientAxios.delete(`/api/tasks/${taskId}`, {params: {project}});

            dispatch({
                type: DELETE_TASK,
                payload: taskId
           });
           
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @name:editTask.
     * @description:Edit a task. 
     * @param:Task object.
    */
    const editTask = async (task) => {
       try {
            const result = await clientAxios.put(`/api/tasks/${task._id}`, task);
            
            dispatch({
                type: EDIT_TASK,
                payload: result.data.task
            })

       } catch (error) {
           console.log(error);
       }
    }

    /**
     * @name:currentTask.
     * @description:Updates task.selectedTask, selecting a task to edit.
     * @param:Task object.
    */
    const currentTask = (task) => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        })
    }

    /**
     * @name:unselectTask.
     * @description:clean selected task.
     * @param:none.
    */
    const unselectTask = () => {
        dispatch({
            type: UNSELECT_TASK
        })
    }

    return (
        <taskContext.Provider
            value={{
                projectTasks: state.projectTasks,
                taskError: state.taskError,
                selectedTask: state.selectedTask,
                getTasks,
                addTask,
                taskValidation,
                deleteTask,
                currentTask,
                editTask,
                unselectTask
            }}
        >
            {props.children}
        </taskContext.Provider>
    );
};

export default TaskState;