/**
 * Created by zjtech on 16-7-26.
 */
import {LOGIN} from './ActionTypes'

const loginResult = {
    isLoggedIn: false,
    desc: ""
};

//将dispatch中的payload转换为state
export default function LoginReducer(state = loginResult, action) {
    switch (action.type) {
        case LOGIN:
            return Object.assign({}, state, {
                desc: action.desc, //deep clone this object
                isLoggedIn: action.isLoggedIn
            });
    }

    return state;
}
