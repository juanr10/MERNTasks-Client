import React, { useReducer } from 'react';
import clientAxios from '../../config/axios';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
//TYPES
import{
        ADD_PROJECT_FORM,
        GET_PROJECTS,
        ADD_PROJECT,
        PROJECT_VALIDATION,
        PROJECT_MESSAGE,
        CURRENT_PROJECT,
        DELETE_PROJECT
    } from '../../types';

const ProjectState = props => {

    const initialState = {
        projects : [],
        addForm : false,
        formError: false,
        message: null,
        project: null
    }

    //Execute actions on the state from a dispatch
    const [state, dispatch] = useReducer(projectReducer, initialState);

    /**
     * @name:showAddForm.
     * @description:Change state.addForm to true or false.
     * @param:boolean true or false.
    */
    const showAddForm = (state) => {
        dispatch({
            type: ADD_PROJECT_FORM,
            payload: state
        })
    }

    /**
     * @name:getProjects.
     * @description:Get projects from DB updating state.projects.
     * @param:none.
    */
    const getProjects = async () => {
        try {
            const result = await clientAxios.get('/api/projects');
            
            dispatch({
                type: GET_PROJECTS,
                payload: result.data.projects
            })

        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @name:addProject.
     * @description:Adds a project to DB updating state.projects.
     * @param:Project object.
     * @return:none.
    */
    const addProject = async (project) => {
        try {
            const result = await clientAxios.post('/api/projects', project);
  
            dispatch({
                type: ADD_PROJECT,
                payload: result.data
            })

            //Notifying user
              const alert = {
                msg: 'Proyecto creado.',
                category: 'alert-success'
            }

            dispatch({
                type: PROJECT_MESSAGE,
                payload: alert
            })

        } catch (error) {
            const alert = {
                msg: 'Error creando un nuevo proyecto. <br> Vuelve a intentarlo.',
                category: 'alert-error'
            }

            dispatch({
                type: PROJECT_MESSAGE,
                payload: alert
            })
        }           
    }

    /**
     * @name:showError.
     * @description:Updates state.formError to true. 
     * @param:none.
    */
    const showError = () => {
        dispatch({
            type: PROJECT_VALIDATION
        })
    }

    /**
     * @name:currentProject.
     * @description:Updates state.project data filtering projects by the id of the selected project.
     * @param:Project id.
     * @return: An array with the project (object) filtered.
    */
    const currentProject = (projectId) => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: projectId
        })
    }

    /**
     * @name:deleteProject.
     * @description:Deletes a project updating state.projects filtering projects by the id of the selected project.
     * @param:Project id.
     * @return: An array of projects without the project with the id that has been passed.
    */
    const deleteProject = async (projectId) => {
        try {
            await clientAxios.delete(`/api/projects/${projectId}`);

            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })

            //Notifying user
            const alert = {
                msg: 'Proyecto eliminado.',
                category: 'alert-success'
            }

            dispatch({
                type: PROJECT_MESSAGE,
                payload: alert
            })

        } catch (error) {
            const alert = {
                msg: 'Error al eliminar el proyecto. <br> Vuelve a intentarlo.',
                category: 'alert-error'
            }

            dispatch({
                type: PROJECT_MESSAGE,
                payload: alert
            })
        }
    }

    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                addForm: state.addForm,
                formError: state.formError,
                message: state.message,
                project: state.project,
                showAddForm,
                getProjects,
                addProject,
                showError,
                currentProject,
                deleteProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;