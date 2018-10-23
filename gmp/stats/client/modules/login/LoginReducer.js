import {LOGIN} from './LoginActionTypes';

export const loginResult = (state = {username: null, token: null, error: null}, action) => {
    switch (action.type) {
        case LOGIN: {
            return {...action.result};
        }
        default:
            return state;
    }
};