import {browserHistory} from 'react-router'
import RouterConstant from '../../common/RouterConstant'
import {login_url} from '../../global/ServiceURL';
import {LOGIN} from './LoginActionTypes'
require('es6-promise').polyfill();
require('isomorphic-fetch');

export function login(username, password) {
    return (dispatch) => {
        fetch(login_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `username=${username}&password=${password}`
        }).then(response => {
            //Unauthorized user
            if (response.status == 401) {
                throw new Error("Incorrect username or password.");
            }
            if (response.status >= 400) {
                throw new Error(`Bad response and the status code is ${response.status}`);
            }
            return response.json();//return a Promise object
        }).then(data => {
            dispatch({type: LOGIN, result: data});
            browserHistory.push(RouterConstant.home);
        }).catch(error => {
            dispatch({type: LOGIN, result: {username: null, token: null, error: error.message}});
        });
    }
}