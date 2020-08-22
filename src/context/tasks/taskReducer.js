import {TASKS_PROJECT,
        ADD_TASK,
        TASK_VALIDATION,
        DELETE_TASK,
        CURRENT_TASK,
        EDIT_TASK,
        UNSELECT_TASK,
} from '../../types/index';


export default (state, action) => {
    switch (action.type) {
        case TASKS_PROJECT:
            return {
                ...state,
                projectTasks: action.payload
            }
        case ADD_TASK:
            return {
                ...state,
                projectTasks: [action.payload, ...state.projectTasks],
                taskError: false
            }
        case TASK_VALIDATION:
            return {
                ...state,
                taskError: true
            }
        case DELETE_TASK:
            return {
                ...state,
                projectTasks: state.projectTasks.filter(task => task._id !== action.payload)
            }
        case EDIT_TASK:
            return {
                ...state,
                projectTasks: state.projectTasks.map(task => task._id === action.payload._id 
                    ? action.payload
                    : task
                    )
            }
        case CURRENT_TASK:
            return {
                ...state,
                selectedTask: action.payload,
                taskError : false
            }
        case UNSELECT_TASK:
            return {
                ...state,
                selectedTask: null
            }
    
        default:
            return state;
    }

}