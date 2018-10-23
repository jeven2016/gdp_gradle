/**
 * Created by zjtech on 16-8-9.
 */
import React, {Component} from "react";
import {Select} from 'antd';
const Option = Select.Option;

export default class ModuleSelect extends Component {
    handleMenuClick(e) {
        window.console.log('click', e);
    }

    handleButtonClick(e) {
        window.console.log('click select module button', e);
    }

    render() {

        return (
            <Select showSearch
                    style={{width: 180}}
                    placeholder="切换模块"
                    optionFilterProp="children"
                    notFoundContent="无法找到"
                    onChange={this.handleButtonClick.bind(this)}>
                <Option value="1">用户管理</Option>
                <Option value="2">权限管理</Option>
                <Option value="3">服务器管理</Option>
            </Select>
        )
    }
}