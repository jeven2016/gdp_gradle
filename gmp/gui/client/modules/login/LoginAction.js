/**
 * Created by zjtech on 16-7-26.
 */
import {browserHistory} from 'react-router'
import RouterConst from '../../common/RouterConstant'

import {LOGIN} from './ActionTypes'

export function login(userName, password) {

    return (dispatch)=> {
        //validate the user and dispatch the user info object after the user succeed to logged in
        let result = true;
        if (result) {
            browserHistory.push(RouterConst.home);
        } else {
            let loginResult = {
                password: password,
                type: LOGIN,
                isLoggedIn: true,
                desc: "welcome to come here"
            };
            dispatch(loginResult);
        }
    }
}
