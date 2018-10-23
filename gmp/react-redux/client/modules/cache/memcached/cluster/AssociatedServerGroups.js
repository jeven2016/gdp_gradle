/**
 * Created by root on 16-8-23.
 */
import React, {Component} from 'react'

import {Table, Button} from 'antd';

const columns = [{
    title: '名称',
    dataIndex: 'name',
}, {
    title: '启用',
    dataIndex: 'enable',
}, {
    title: '描述',
    dataIndex: 'desc',
}];

const data = [];
for (let i = 0; i < 5; i++) {
    data.push({
        key: i,
        name: `服务器${i}`,
        enable: '是',
        desc: '配置的服务器。'
    });
}

export default class AssociatedServerGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],  // 这里配置默认勾选列
            loading: false
        };
    }

    onSelectChange(selectedRowKeys) {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    }

    render() {
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };
        return (<div>
            <Table size="small" rowSelection={rowSelection} columns={columns} dataSource={data}/>
        </div>)
    }
}