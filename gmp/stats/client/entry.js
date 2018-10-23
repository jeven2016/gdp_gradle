/**
 * The main entrance of this application
 */
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {browserHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import store from "./modules/init/InitStore";
import RouterConfig from "./global/RouterConfig";

import "./static_resources/styles/scss/_app.scss";
import "./static_resources/styles/3rd/fa/css/font-awesome.min.css"
import "./static_resources/styles/3rd/animate/animate.min.css";
import "./static_resources/styles/3rd/wui/wui-bundle-min.css";

/**
 * For Hash history
 */

/*import { Router, useRouterHistory } from 'react-router'
 import { createHashHistory } from 'history'
 // useRouterHistory creates a composable higher-order function
 const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })*/

/*
 Via  Babel loader

 var Person = require("babel!./Person.js").default;
 new Person();

 Async loader:

 function someEventHandler() {
 System.import('some-module').then((SomeModule) => {
 var module = new SomeModule();
 // ...
 })
 }
 */

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);


render((
        <Provider store={store}>
            <RouterConfig history={history}/>
        </Provider>
    ),
    document.getElementById('root')
);

//
/*require.ensure([], () => {
 var MyModule = require('./modules/MyModule.js');
 var MyModule2 = require('./modules/MyModule2.js');
 window.console.log("mymodule=" + new MyModule().showPxp());
 });*/
