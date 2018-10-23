/**
 * Created by zjtech on 16-7-26.
 */
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import ReducersRegistry from './ReducersRegistry'

const customMiddlewareTest = store => next => (action) => {
    window.console.log("befor");
    let result = next(action);
    window.console.log(result);
    window.console.log("after, state=" +store.getState());
    return result;
};

const createStoreWithMiddleware = compose(
    applyMiddleware(
        thunk,
        customMiddlewareTest
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);


export default function StoreInitializer(initialState) {
    const store = createStoreWithMiddleware(ReducersRegistry, initialState);

    //热替换选项
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./ReducersRegistry', () => {
            const nextReducer = require('./ReducersRegistry')
            store.replaceReducer(nextReducer)
        })
    }

    return store
}
