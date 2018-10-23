/**
 * Created by zjtech on 16-7-26.
 */
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux';

import LoginReducer from '../login/LoginReducer'

//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
    routing: routerReducer,
    LoginReducer,
});

export default rootReducer
