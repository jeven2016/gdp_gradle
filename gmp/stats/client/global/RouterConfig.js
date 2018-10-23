/**
 *
 * Created by zjtech on 16-7-29.
 */
import React, {Component, PropTypes} from "react";
import {Router, Route, IndexRoute} from "react-router";
import StatsIndexContainer from "../modules/stats/StatsIndexContainer";
import AppContainer from "./AppContainer";
import Login from '../modules/login/Login'
import {NoMatchComponent} from './NoMatchComponent'
import {checkPermission} from '../utlis/Authentication'

/**
 * Router configuration
 */
export default class RouterConfig extends Component {
    render() {
        return (
            <Router history={this.props.history}>
                <Route path="/" component={AppContainer}>
                    <IndexRoute component={Login}/>
                    <Route path="login" component={Login}/>
                    <Route path="stats" component={StatsIndexContainer} onEnter={checkPermission}>
                    </Route>
                    <Route path="*" component={NoMatchComponent}/>
                </Route>
            </Router>
        );
    }
}

RouterConfig.propTypes = {
    history: PropTypes.object.isRequired
};

