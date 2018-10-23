/**
 * Created by zjtech on 16-7-29.
 */
import React, {Component} from "react";
import AppBar from "material-ui/AppBar";
import Resource from '../common/I18nResources'

export default class TopNavBar extends Component {
    render() {
        return <AppBar title={Resource.common.navBar.title}/>;
    }

}