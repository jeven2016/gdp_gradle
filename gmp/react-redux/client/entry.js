/**
 * The main entrance of this application
 */
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {browserHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import storeInitializer from "./modules/init/StoreInitializer";
import {RouterConfig} from "./global/RouterConfig";


//init a store
const store = storeInitializer();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);


render((
        <Provider store={store}>
            <RouterConfig history={history}/>
        </Provider>
    ),
    document.getElementById('root')
);