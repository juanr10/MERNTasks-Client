import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Alert from '../alerts/Alert';
import alertContext from '../../context/alerts/alertContext';
import authContext from '../../context/authentication/authContext';

const NewAccount = (props) => {
    //Get state from 'AlertState.js'
    const alertsContext = useContext(alertContext);
    const { alert, showAlert } = alertsContext;
    //Get state from 'AuthState.js'
    const authenticationContext = useContext(authContext);
    const { message, authenticated, registerUser } = authenticationContext;

    //If the user is authenticated or there are alerts:
    useEffect(() => {
        if(authenticated){
            showAlert('¡Registro completo!', 'alert-success');  
            //Redirection to the main page
            props.history.push('/projects-page');
        }

        if(message){
            showAlert(message.msg, message.category);
            return;
        }

        //eslint-disable-next-line
    }, [message, authenticated, props.history]);

    
    const [user, saveUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmation: ''
    }); 

    const {name, email, password, confirmation} = user;

    /**
     * @name:onChange.
     * @description:read the data from an input and stores it in the state.
     * @param:event e.
    */
    const onChange = e => {
        saveUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    /**
     * @name:onSubmit.
     * @description:validates the fields entered by the user and executes registerUser() from 'AuthState.js'.
     * @param:event e.
    */
    const onSubmit = e => {
        e.preventDefault();

        if(name.trim() === '' || email.trim() === '' || password.trim() === '' || confirmation.trim() === ''){
            showAlert('Todos los campos son obligatorios.', 'alert-error');
            return;
        }

        if(password.length < 6){
            showAlert('La contraseña debe contener al menos 6 caracteres.', 'alert-error');
            return;
        }

        if(password !== confirmation){
            showAlert('Las contraseñas no coinciden.', 'alert-error');
            return;
        }

        //Register new user 
        registerUser({
            name,
            email,
            password
        });
    }

    return (
        <div className="form-usuario">
            {/* ALERT */}
            {alert ? <Alert/> : null}

            <div className="contenedor-form sombra-dark">
                <h1><i className="fas fa-user-plus"></i> Crea una cuenta</h1>
                <form onSubmit={onSubmit}>
                    {/* NAME */}
                    <div className="campo-form">
                        <i className="far fa-user"></i>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Introduce tu nombre"
                            value={name}
                            onChange={onChange}
                        />
                    </div>
                    {/* EMAIL */}
                    <div className="campo-form">
                        <i className="far fa-envelope"></i>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Introduce tu email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    {/* PASSWORD */}
                    <div className="campo-form">
                        <i className="fa fa-unlock-alt"></i>
                        <input 
                            type="password"
                            id="password"
                            className="password-input"
                            name="password"
                            placeholder="Introduce una contraseña (min.6 carac)"
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <i className="fas fa-redo-alt"></i>
                        <input 
                            type="password"
                            id="confirmation"
                            className="confirmation-input"
                            name="confirmation"
                            placeholder="Repite la contraseña"
                            value={confirmation}
                            onChange={onChange}
                        />
                    </div>
                    {/* SUBMIT */}
                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Regístrate"
                        />
                    </div>
                </form>

                <Link to={'/'} className="enlace-cuenta">
                    Vuelve a 'Iniciar sesión'
                </Link>

            </div>
        </div>
    );
};

export default NewAccount;