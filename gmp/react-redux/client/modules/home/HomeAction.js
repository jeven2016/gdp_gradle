/**
 * Created by root on 16-8-21.
 */
import {SELECT_ITEM} from '../init/ActionTypes'
import {browserHistory} from 'react-router'

export function navigateTo(link, module) {
    if (link) {
        browserHistory.push(link);
    } else {
        throw new Error("the link is invalid:" + link);
    }
    return {
        type: SELECT_ITEM,
        link: link,
        module: module
    }
}