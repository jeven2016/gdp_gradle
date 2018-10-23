/**
 * Created by zjtech on 16-8-17.
 */
import React, {Component, PropTypes} from 'react'

export default class Drawer extends Component {
    render() {
        const {visible} = this.props;
        let displaySetting = visible ? "block" : "none";
        return (
            <div className="drawer" style={{display: displaySetting}}>
                <div className="drawer-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

Drawer.propTypes = {
    children: PropTypes.node,
    visible: PropTypes.bool
};