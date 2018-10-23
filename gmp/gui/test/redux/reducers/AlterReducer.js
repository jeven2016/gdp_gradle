/**
 * Created by root on 16-8-18.
 */
//reducer其实也是个方法而已,参数是state和action,返回值是新的state
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter'
export default function alter(state = 0, action) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            alert(INCREMENT_COUNTER)
            return state + 1
        case DECREMENT_COUNTER:
            alert(DECREMENT_COUNTER)
            return state - 1
        default:
            return state
    }
}