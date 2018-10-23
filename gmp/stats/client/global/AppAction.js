import {SHOW_WARNING_MESSAGE} from './AppActionTypes'

export const showWarning = (message = "")=> {
    return {
        type: SHOW_WARNING_MESSAGE,
        warningMessage: message
    }
};