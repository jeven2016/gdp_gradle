/**
 * Created by zjtech on 16-8-8.
 */
import React, {Component} from "react";
import {Row, Col, Input, Badge} from 'antd';
import FontIcon from '../../widgets/common/FontIcon'


export default class TopNavBar extends Component {
    render() {
        return (
            <div className="top-nav-bar">
                <Row align="top">
                    <Col xs={2} sm={2} md={2} lg={1}>
                        <div className="collapse">
                            <FontIcon className='list' size={2}/>
                        </div>
                    </Col>
                    <Col xs={14} sm={14} md={9} lg={6}>
                        <div className="search">
                            <Input addonBefore={<span><FontIcon className="search" size={2}/></span>}
                                   placeholder="请输入搜索关键字"
                                   size="large"/>
                        </div>
                    </Col>
                    <Col xs={8} sm={8} md={13} lg={17}>
                        <div className="btn">
                            <Badge count={5}>
                                <FontIcon className='warning' size={2}/>
                            </Badge>
                        </div>
                        <div className="btn">
                            <FontIcon className='th' size={2}/>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

/*

 <div>
 <div className="ant-layout-main">
 <div className="ant-layout-header"></div>
 <div className="ant-layout-breadcrumb">
 <Breadcrumb>
 <Breadcrumb.Item>首页</Breadcrumb.Item>
 <Breadcrumb.Item>应用列表</Breadcrumb.Item>
 <Breadcrumb.Item>某应用</Breadcrumb.Item>
 </Breadcrumb>
 </div>
 <div className="ant-layout-container">
 <div className="ant-layout-content">
 <div style={{height: 590}}>
 内容区域
 </div>
 </div>
 </div>
 <div className="ant-layout-footer">
 Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持
 </div>
 </div>
 </div>*/
