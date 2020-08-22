import React, {useContext, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../context/authentication/authContext';

/**
 * @name:PrivateRoute.
 * @description:Higher-order component to protect a component depending on if the user is authenticated.
 * @param:Component to protect & props copy.
 * @return:Redirection to the login page or to the component.
*/
const PrivateRoute = ({ component: Component,  ...props }) => {
    //Get state from 'AuthState.js'
    const authenticationContext = useContext(authContext);
    const { authenticated, loading, userAuthenticated } = authenticationContext;

    useEffect(() => {
        userAuthenticated();
        //eslint-disable-next-line
    }, []);

    return (
        // Check if the user is authenticated
        <Route {...props} render={ props => !authenticated && !loading ? 
            (
                <Redirect to="/"/>
            ) 
            : 
            (
                <Component {...props} />
            )
        }
        />
    );
};

export default PrivateRoute;