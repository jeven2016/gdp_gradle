/**
 * Created by root on 16-8-22.
 */
import React from 'react'
import Resource from '../../../common/I18nResources'
import * as lodash from 'lodash'
import {Card, Tabs, Breadcrumb} from 'antd';
import ClusterView from './ClusterView'

const TabPane = Tabs.TabPane;

export const MemcachedIndexView = () => ({
    type: {cluster: 'cluster', server: 'server'},

    render() {
        const {currentType = this.type.cluster} = this.props;
        let resKey = `cache.memcached.${currentType}.title`;
        let res = lodash.get(Resource, resKey);
        let panelTitle = <Breadcrumb separator=">">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item href="#">缓存服务器</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Memcached服务器</Breadcrumb.Item>
        </Breadcrumb>;

        return (<div className="content-area">
            <Card title={panelTitle} bordered={true} style={{width: '100%'}}>
                <ClusterView/>
            </Card>

        </div>);
    }
});
