/**
 * Created by zjtech on 16-7-29.
 */
import React, {Component, PropTypes} from "react";

//load sass files
import '../static_resources/styles/3rd/fa/css/font-awesome.min.css'
import 'antd/dist/antd.min.css';
import '../static_resources/styles/3rd/iconfont/antd.css';
import "../static_resources/styles/scss/app.scss";

/**
 * Main entry of this application
 */
export default class AppContainer extends Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

AppContainer.propTypes = {
    children: PropTypes.object
};
