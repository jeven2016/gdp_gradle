/**
 *
 * Created by zjtech on 16-7-29.
 */
import React, {Component, PropTypes} from "react";
import {Router, Route, IndexRoute} from "react-router";
import LoginContainer from "../modules/login/LoginContainer";
import AppContainer from "./AppContainer";
import Home from '../modules/home/Home'
import {MemcachedIndexView} from '../modules/cache/memcached/MecmcachedIndexView'

export class RouterConfig extends Component {
    render() {
        return (
            <Router history={this.props.history}>
                <Route path="/" component={AppContainer}>
                    <IndexRoute component={LoginContainer}/>
                    <Route path="login" component={LoginContainer}/>
                    <Route path="home" component={Home}>
                        <Route path="memcached/cluster" component={MemcachedIndexView}/>
                    </Route>
                </Route>
            </Router>
        );
    }
}

RouterConfig.propTypes = {
    history: PropTypes.object.isRequired
};

