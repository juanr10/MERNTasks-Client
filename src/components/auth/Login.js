import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Alert from '../alerts/Alert';
import alertContext from '../../context/alerts/alertContext';
import authContext from '../../context/authentication/authContext';

const Login = (props) => {
    //Get state from 'AlertState.js'
    const alertsContext = useContext(alertContext);
    const { alert, showAlert } = alertsContext;
    //Get state from 'AuthState.js'
    const authenticationContext = useContext(authContext);
    const { message, authenticated, userData, login } = authenticationContext;

    //Login validation message & redirection:
    useEffect(() => {
        if(authenticated){
            //Waiting for useData 
            if(userData){
                showAlert(`Hola, ${userData.name}.`, 'alert-success');
                //Redirection to the main page
                props.history.push('/projects-page');
            }      
        }

        if(message){
            showAlert(message.msg, message.category);
        }

        //eslint-disable-next-line
    }, [message, authenticated, userData, props.history]);


    const [user, saveUser] = useState({
        email: '',
        password: ''
    }); 

    const {email, password} = user;

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
     * @description:validates the fields entered by the user and executes login() from 'AuthState.js'.
     * @param:event e.
    */
    const onSubmit = e => {
        e.preventDefault();

        if(email.trim() === '' || password.trim() === ''){
            showAlert('Todos los campos son obligatorios.', 'alert-error');
            return;
        }

        login({email, password});
    }

    return (
        <div className="form-usuario">
            {/* ALERT */}
            {alert ? <Alert/> : null}

            <div className="contenedor-form sombra-dark">
                <h1>MERN<span>Tasks</span></h1>
                <h2><i className="fas fa-sign-in-alt"></i> Iniciar sesión</h2>

                <form onSubmit={onSubmit}>
                    {/* EMAIL */}
                    <div className="campo-form">
                        <i className="far fa-envelope"></i>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Correo eléctronico"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    {/* PASSWORD */}
                    <div className="campo-form">
                        <i className="fas fa-unlock-alt"></i>
                        <input 
                            type="password"
                            id="password"
                            className="password-input"
                            name="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    {/* SUBMIT */}
                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Entrar"
                        />
                    </div>
                </form>
                {/* LINK NEW ACCOUNT */}
                <Link to={'/new-account'} className="enlace-cuenta">
                    ¿No tienes una cuenta? Regístrate aquí
                </Link>
            </div>
        </div>
    );
};

export default Login;