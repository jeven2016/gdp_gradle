/**
 * Created by zjtech on 16-8-3.
 */
import React, {Component, PropTypes} from "react";
import {Row, Col, Form, Input, Button} from "antd";
import FontIcon from '../../widgets/common/FontIcon'
import {LoginTitle} from './subcomponents/LoginTitle'

const FormItem = Form.Item;

/**
 * Validate function for login form
 * @param values
 */

class LoginPanel extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    handleSubmit(e) {
        e.preventDefault();
        let formObj = this.props.form.getFieldsValue();
        let userName = formObj.userName;
        let password = formObj.password;

        const {login} = this.props;
        login(userName, password);
    }

    render() {
        const {getFieldProps} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };

        //es: Extra small devices Phones (<768px)
        //sm: Small devices Tablets (≥768px)
        //md: Medium devices Desktops (≥992px)
        //lg: Large devices Desktops (≥1200px)
        return (
            <div>
                <Row type="flex" justify="space-around" align="middle">
                    <Col xs={1} sm={6} md={7} lg={8}>

                    </Col>
                    <Col xs={22} sm={12} md={10} lg={8}>
                        <LoginTitle/>
                        <div className="login-container">
                            <div className="header">
                                <FontIcon className="align-justify" size={1}/>
                                用户登录
                            </div>
                            <div className="body">
                                <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                                    <FormItem
                                        id="control-input"
                                        wrapperCol={{offset: 2, span: 20}}
                                        size="large">
                                        <Input size="large"
                                               addonBefore={<FontIcon className='user icon' size={2}/> }
                                               placeholder="用户名" {...getFieldProps('userName', {initialValue: ''})}/>
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        wrapperCol={{offset: 2, span: 20}}>
                                        <Input addonBefore={<FontIcon className='lock icon' size={2}/> }
                                               type="password" {...getFieldProps('password', {initialValue: ''})}
                                               placeholder="密码"/>
                                        <a className="forgot-password-link" href="#">
                                            忘记密码?
                                        </a>
                                    </FormItem>
                                    <FormItem wrapperCol={{offset: 2, span: 20}} style={{textAlign: 'center'}}>
                                        <Button type="primary" htmlType="submit">确定</Button>
                                        <Button type="secondary" htmlType="button"
                                                style={{marginLeft: '15px'}}>重置</Button>
                                    </FormItem>
                                </Form>
                            </div>

                        </div>
                    </Col>
                    <Col xs={1} sm={6} md={7} lg={8}>
                    </Col>
                </Row>
            </div>
        );
    }
}

LoginPanel.propTypes = {
    login: PropTypes.func,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    form: PropTypes.object
};

let LoginForm = Form.create()(LoginPanel);
export default LoginForm;