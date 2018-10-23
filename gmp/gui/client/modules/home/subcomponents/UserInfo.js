/**
 * Created by zjtech on 16-8-16.
 */
import React, {Component, PropTypes} from 'react'
import {Dropdown, Menu} from "antd";
import FontIcon from 'FontIcon'

let userPic = require('../../../static_resources/images/external/images.jpg');//load this picture asynchronously since its size exceeds 10KB

const menu = (
    <Menu theme="dark" style={{width: '150px'}} mode="vertical">
        <Menu.Item key="0">
            <a href="#"><FontIcon className="user"/>个人设置</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href="#"><FontIcon className="lock"/>修改密码</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3"><FontIcon className="navicon"/>其他设置</Menu.Item>
    </Menu>
);

/**
 * 用户信息
 */
export default class UserInfo extends Component {
    showFloatingDrawer() {
        const {showDrawerHandler} = this.props;
        showDrawerHandler(true);
    }

    render() {

        return (
            <div className="user-info">
                <a href="#" onClick={this.showFloatingDrawer.bind(this)}>
                    <FontIcon className="list menu" size={2}/>
                </a>
                <img src={userPic} className="user-picture"/>
                <div className="user-name">
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a href="#">
                            Jeven Wang<FontIcon className="angle-down"/>
                        </a>
                    </Dropdown>
                </div>
            </div>
        )
    }
}

UserInfo.propTypes = {
    showDrawerHandler: PropTypes.func
}