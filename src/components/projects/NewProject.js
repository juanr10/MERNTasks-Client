import React, {Fragment, useState, useContext} from 'react';
import projectContext from '../../context/projects/projectContext';

const NewProject = () => {
    //Get state from 'ProjectState.js'
    const projectsContext = useContext(projectContext);
    const { addForm, formError, showAddForm, addProject, showError } = projectsContext;

    const [project, saveProject] = useState({
        name: ''
    });

    const {name} = project;

    /**
     * @name:onChange.
     * @description:read the data from an input and stores it in the state.
     * @param:event e.
    */
    const onChange = e => {
        saveProject({
            ...project,
            [e.target.name] : e.target.value
        });
    }

    /**
     * @name:onSubmit.
     * @description:validates the data entered and updates state.projects from 'ProjectState.js'.
     * @param:event e.
     * @return:null if it doesn't pass validation.
    */
    const onSubmit = e => {
        e.preventDefault();

        //Validation
        if(name.trim() === ''){
            showError();
            return;
        }

        //Update state.projects from 'ProjectState.js'
        addProject(project);

        //Clean add form
        saveProject({
            name: ''
        });
    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                //Executes function from 'ProjectState.js'
                onClick={() => showAddForm(true)}
            >
                <i className="fas fa-plus-circle"></i> Nuevo proyecto
            </button>

            {/* ADD FORM */}
            { addForm //if addForm is true display the form
               ? (
                <form className="formulario-nuevo-proyecto" onSubmit={onSubmit}>
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre del proyecto"
                        name="name"
                        value={name}
                        onChange={onChange}
                    />
                    {/* BUTTONS */}
                    <div className="formulario-seccion-botones">
                        <input 
                            type="submit" 
                            className="btn btn-primario"
                            value="Agregar"
                        />

                        <button type="button"
                            className="btn btn-terciario-inline"
                            onClick={() => showAddForm(false)}
                        >
                            Cancelar
                        </button>
                    </div> 
                </form>
              ) : null }
            {/* ERROR MESSAGE */}
            { formError ? <p className="mensaje error"><i className="fas fa-exclamation-circle"></i> Introduce un nombre.</p> : null }
        </Fragment>
    );
};

export default NewProject;