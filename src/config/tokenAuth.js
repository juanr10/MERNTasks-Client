import clientAxios from './axios';

/**
 * @name:tokenAuth.
 * @description:Put the token on header defaults or eliminates it if it has expired or doesn't exist.
 * @param:token.
*/
const tokenAuth = (token) => {
    if(token){
        clientAxios.defaults.headers.common['x-auth-token'] = token;
    } else{
        delete clientAxios.defaults.headers.common['x-auth-token'];
    }
}

export default tokenAuth;