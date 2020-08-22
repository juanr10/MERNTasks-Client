import React, {useReducer} from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import clientAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import {SUCCESSFUL_REGISTRATION, 
        ERROR_REGISTRATION,
        GET_USER,
        SUCCESSFUL_LOGIN,
        ERROR_LOGIN,
        LOG_OUT
} from '../../types';

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        userData: null,
        message: null,
        loading: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    /**
     * @name:registerUser.
     * @description:Send a request (POST) with the user's data to add him to DB. In case of success, an authentication token is received from the server.
     * @param:user's data.
    */
    const registerUser = async (data) => {
        try {
            const response = await clientAxios.post('./api/users', data);

            dispatch({
                type: SUCCESSFUL_REGISTRATION,
                payload: response.data
            });

            //Get user data
            userAuthenticated();

        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alert-error'
            }

            dispatch({
                type: ERROR_REGISTRATION,
                payload: alert
            })
        }
    }

    /**
     * @name:userAuthenticated.
     * @description:Reads the access token from the header and sends a request (GET) to get data from the user authenticated.
     * @param:none.
    */
    const userAuthenticated = async () => {
        const token = localStorage.getItem('token');

        if(token){
            //Put on defaults header
            tokenAuth(token);
        }
        
        try {
            const response = await clientAxios.get('/api/auth');

            dispatch({
                type: GET_USER,
                payload: response.data.user
            });

        } catch (error) {
            console.log(error);
            dispatch({
                type: ERROR_LOGIN
            })
        }

    }

    /**
     * @name:login.
     * @description:Send a request (POST) with the email and password to log in.
     * @param:user's email & password.
    */
    const login = async (data) => {
        try {
            const response = await clientAxios.post('api/auth', data);

            dispatch({
                type: SUCCESSFUL_LOGIN,
                payload: response.data
            });

            //Get user data
            userAuthenticated();

        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alert-error'
            }

            dispatch({
                type: ERROR_LOGIN,
                payload: alert
            })
        }
    }
   
    /**
     * @name:logOut.
     * @description:Remove access token & remove user data.
     * @param:none.
    */
    const logOut = () => {
        dispatch({
            type:LOG_OUT
        })
        
    }

    return(
        <authContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                userData: state.userData,
                message: state.message,
                loading: state.loading,
                registerUser,
                userAuthenticated,
                login,
                logOut
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState;
