/**
 * Created by root on 16-8-21.
 */
import {SELECT_ITEM} from '../init/ActionTypes'

export default function homeState(state, action) {
    switch (action.type) {
        case SELECT_ITEM:
            return Object.assign({}, state, {
                link: action.link,
                module: action.module
            });
        default:
            return state;
    }

}