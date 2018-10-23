import {connect} from 'react-redux'
import {isEmptyString} from '../utlis/CommonValidators'
import store from '../modules/init/InitStore';


const checkPermission = (nextState, replace) => {
    return true;
   /* let token = store.getState().loginResult.token;

    if (isEmptyString(token)) {
        replace({pathname: '/login'});

    } else {
        return true;
    }*/
};
//
export {
    checkPermission
}