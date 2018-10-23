/**
 * Created by root on 16-8-22.
 */
import React, {Component} from 'react'
import {Form, Input, Button, Checkbox, Radio, Tooltip, Select, Card, Row, Col} from 'antd';
import {browserHistory} from 'react-router'
import AssociatedServerGroups from './cluster/AssociatedServerGroups'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class ClusterUpdateView extends Component {
    handleSubmit(e) {
        e.preventDefault();
        console.log('收到表单值：', this.props.form.getFieldsValue());
    }

    enableCluster() {

    }

    render() {
        const {getFieldProps} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 16},
        };

        return (<div>
            <Form horizontal onSubmit={this.handleSubmit}>
                <Row>
                    <Col sm={24} md={{span: 16, offset: 4}} lg={{span: 16, offset: 4}}>

                        <FormItem
                            {...formItemLayout}
                            label="名称"
                            help="只能包含最多20个字符"
                        >
                            <Input size="large" type="text" {...getFieldProps('pass', {initialValue: ''})}
                                   placeholder="请输入名称"/>
                        </FormItem>
                        <FormItem
                            id="select"
                            label="状态"
                            {...formItemLayout}
                        >
                            <Select id="select" size="large" defaultValue="enabled"
                                    onChange={this.enableCluster.bind(this)}>
                                <Option value="enabled">启用</Option>
                                <Option value="disabled">停用</Option>
                            </Select>
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="描述"
                            help="最多不能超过250个字符"
                        >
                            <Input type="textarea"
                                   placeholder="详细描述" {...getFieldProps('remark', {initialValue: ''})} />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col sm={24} md={{span: 16, offset: 4}} lg={{span: 16, offset: 4}}>
                        <div className="cluster-server-container">
                            <span className="label">管理服务器：</span>
                            <div className="button-group">
                                <Button type="primary" size="small" icon="plus-circle-o"> 增加</Button>
                            </div>
                            <AssociatedServerGroups/>
                        </div>

                    </Col>
                </Row>
                <Row>
                    <Col sm={24} md={{span: 16, offset: 4}} lg={{span: 16, offset: 4}}>
                        <FormItem wrapperCol={{span: 16, offset: 6}}>
                            <Button type="primary" htmlType="submit">确定</Button>
                            <Button type="secondary" htmlType="button" style={{marginLeft: 10}} onClick={()=> {
                                browserHistory.goBack()
                            }}>返回</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>)
    }
}

const form = Form.create()(ClusterUpdateView);
export default form;