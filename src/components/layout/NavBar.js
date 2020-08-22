import React, {useContext, useEffect} from 'react';
import authContext from '../../context/authentication/authContext';

const NavBar = () => {
    //Get state from 'AuthState.js'
    const authenticationContext = useContext(authContext);
    const { userAuthenticated, userData, logOut } = authenticationContext;

    useEffect(()=> {
        /* Checking authentication */
        userAuthenticated();
        //eslint-disable-next-line
    }, []);

    /**
     * @name:onClick.
     * @description:log the user out.
     * @param:none.
    */
    const onClick = async () => {
        /*  BUG: The project selected by the user who was disconnected remains fixed in the new session.
            Actions to solve it:
                - A Refresh has been added to clean up the data.
                - Asynchronous function that waits to log out before refreshing.
        */
        await logOut();
        window.location.reload(false);
    }

    return (
        <header className="app-header">
            {userData ? <p className="nombre-usuario"><i className="far fa-user"></i> <span>{userData.name}.</span></p> : null}
            
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => onClick()}
                >
                    <i className="fas fa-sign-out-alt"></i> Cerrar sesión
                </button>
            </nav>
        </header>
    );
};

export default NavBar;