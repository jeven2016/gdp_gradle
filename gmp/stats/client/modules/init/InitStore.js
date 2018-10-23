/**
 * Created by zjtech on 16-7-26.
 */
import {createStore, applyMiddleware, compose} from 'redux'
import LoaderMiddleware from './LoaderMiddleware'
import thunk from 'redux-thunk'
import ReducersRegistry from './ReducersRegistry'
import createLogger from 'redux-logger';

//logger
const logger = createLogger();

const createStoreWithMiddleware = compose(
    applyMiddleware(
        thunk,
        logger,
        LoaderMiddleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);


function initStore(initialState) {
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

export default initStore();
