/**
 * Created by zjtech on 16-8-8.
 */
import React, {Component, PropTypes} from "react";
import {Menu, Tabs} from 'antd';
import ModuleSelect from './ModuleSelect'
import FontIcon from 'FontIcon'

const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;

export default class SliderBar extends Component {
    constructor(props) {
        super(props);
    }

    onItemClick({key, keyPath}) {
        const {selectItem} = this.props;
        selectItem(key, keyPath[1]);
    }

    render() {
        let {rootClass = 'slider-bar slider-bar-primary', menuTheme = 'light'} = this.props;

        return (<div>
                <div className={rootClass}>
                    <Tabs defaultActiveKey="2" style={{width: '100%'}}>
                        <TabPane tab={<span><FontIcon className="heart"/>&nbsp;</span>} key="1">
                            选项卡一
                        </TabPane>
                        <TabPane tab={<span><FontIcon className="list"/>&nbsp;</span>} key="2" title="所有菜单">
                            <ModuleSelect/>
                            <Menu mode="inline" theme={menuTheme} onClick={this.onItemClick.bind(this)}
                                  defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
                                <SubMenu key="memcached"
                                         title={<span><FontIcon className="user" size={1}/>Memcached服务器</span>}>
                                    <Menu.Item key="/home/memcachedServer">
                                        <FontIcon className="user" size={1}/>&nbsp; 服务器管理
                                    </Menu.Item>
                                    <Menu.Item key="/home/memcached/group">
                                        <FontIcon className="user" size={1}/>&nbsp; 服务器组管理
                                    </Menu.Item>
                                    <Menu.Item key="/home/memcached/cluster">
                                        <FontIcon className="user" size={1}/>&nbsp; 集群管理
                                    </Menu.Item>
                                    <Menu.Item key="/home/memcached/globalConfig">
                                        <FontIcon className="user" size={1}/>&nbsp; 全局配置
                                    </Menu.Item>
                                </SubMenu>

                                <Menu.Item key="/cache/redis"><FontIcon className="user" size={1}/>&nbsp;
                                    Redis服务器</Menu.Item>
                                <Menu.Item key="/cache/local"><FontIcon className="user" size={1}/>&nbsp;
                                    本地缓存</Menu.Item>
                                <Menu.Item key="/home/globalCache"><FontIcon className="user" size={1}/>&nbsp;
                                    全局设置</Menu.Item>
                            </Menu>
                        </TabPane>
                    </Tabs>

                </div>
            </div>
        )
    }
}

SliderBar.propTypes = {
    rootClass: PropTypes.string,
    menuTheme: PropTypes.string,
    clickBlankSpace: PropTypes.func,
    selectItem: PropTypes.func
};
