import{ ADD_PROJECT_FORM,
        GET_PROJECTS,
        ADD_PROJECT,
        PROJECT_VALIDATION,
        PROJECT_MESSAGE,
        CURRENT_PROJECT,
        DELETE_PROJECT
    } from '../../types';

export default (state, action) => {
    switch(action.type){
        case ADD_PROJECT_FORM:
            return {
                ...state,
                addForm: action.payload,
                //Clean errors
                formError: false
            }
        case GET_PROJECTS:
            return{
                ...state,
                projects: action.payload,  
            }
        case ADD_PROJECT:
            return{
                ...state,
                projects: [...state.projects, action.payload],
                //Hide add form after the insertion
                addForm: false,
                //Clean errors
                formError: false,
                //Clean project selected
                project:null
            }
        case PROJECT_VALIDATION:
            return{
                ...state,
                formError: true
            }
        case PROJECT_MESSAGE:
            return{
                ...state,
                message: action.payload
            }
        case CURRENT_PROJECT:
            return{
                ...state,
                project: state.projects.filter(project => project._id === action.payload)
            }
        case DELETE_PROJECT:
            return{
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                //Clean current project selected
                project:null
            }    

        default: 
            return state;
    }
}