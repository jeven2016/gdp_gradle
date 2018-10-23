import {SHOW_WARNING_MESSAGE} from './AppActionTypes'

export function appResource(state = {warningMessage: null}, action) {
    switch (action.type) {
        case SHOW_WARNING_MESSAGE:
            return Object.assign({}, state, {
                warningMessage: action.warningMessage
            });
        default:
            return state;
    }
}
