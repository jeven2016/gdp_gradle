import React, {Component, PropTypes}from 'react'
import ClusterUpdateView from './ClusterUpdateView'


import {Table, Button, Modal, ant} from 'antd';

const columns = [{
    title: '集群名',
    dataIndex: 'name',
}, {
    title: '启用',
    dataIndex: 'age',
}, {
    title: '服务器',
    dataIndex: 'address',
}, {
    title: '描述',
    dataIndex: 'desc'
}];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `服务器${i}`,
        age: '是',
        address: `${i * 2}台`,
        desc: '已经使用的集群。'
    });
}

export default class ClusterView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUpdateView: false,//是否显示update的view
            showModifyDialog: false,
            showWarningDialog: false,
            selectedRowKeys: [],  // 这里配置默认勾选列
            loading: false,
        };
    }

    start() {
        this.setState({loading: true});
        // 模拟 ajax 请求，完成后清空
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 3000);
    }

    onSelectChange(selectedRowKeys) {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    }

    submit() {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                showModifyDialog: false,
                confirmLoading: false,
            });
        }, 2000);
    }

    cancelSubmit() {
        this.setState({showModifyDialog: false});
    }

    getModalDialog() {
        return ("");
    }

    create() {
        this.setState({showUpdateView: true});
    }

    getContent(loading, rowSelection, hasSelected) {
        if (this.state.showUpdateView) {
            return <ClusterUpdateView/>;
        } else {
            return (<div>
                <div style={{marginBottom: 16}}>
                    <Button type="primary" onClick={this.create.bind(this)}>增加</Button>
                    <span style={{width: '10px'}}>&nbsp;</span>
                    <Button type="ghost" onClick={this.start.bind(this)}
                            disabled={!hasSelected} loading={loading}>删除</Button>
                </div>
                <Table size="small" rowSelection={rowSelection} columns={columns} dataSource={data}/>
            </div>);
        }
    }

    render() {
        const {loading, selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };
        const hasSelected = selectedRowKeys.length > 0;
        let content = this.getContent(loading, rowSelection, hasSelected);
        return (
            <div>
                {content}
            </div>
        );
    }
}