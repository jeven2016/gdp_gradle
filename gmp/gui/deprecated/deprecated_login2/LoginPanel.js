/**
 * Created by zjtech on 16-8-3.
 */
import React, {Component, PropTypes} from "react";
import {reduxForm, Field} from 'redux-form';
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import ActionIcon from "material-ui/svg-icons/action/donut-small";

import Resource from '../../common/I18nResources'
/*
 import {
 Checkbox,
 RadioButtonGroup,
 SelectField,
 TextField,
 Toggle
 } from 'redux-form-material-ui'*/

import {TextField} from 'redux-form-material-ui'

const pageStyle = {
    // height: 400,
    width: '100%',
    // margin: 20,
    textAlign: 'center',
    padding: 0,
    margin: '30% auto 0',
    display: 'inline-block'
};


const styles = {
    button: {
        margin: 12,
    }
};

/**
 * Validate function for login form
 * @param values
 */
const validate = (values) => {
    let userName = values.userName;
    let password = values.password;
    const error = {};
    if (!userName)
        error.userName = Resource.errorCode['1000'];
    if (!password)
        error.password = Resource.errorCode['1001'];
    return error;
};

class LoginPanel extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.refs.userName            // the Field
            .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
            .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
            .focus();               // on TextField
    }

    /**
     * Login
     */
    submit(values) {
        const {login} = this.props;
        login(values.userName, values.password);
    }

    render() {
        const {
            handleSubmit,
            // resetForm,
            submitting
        } = this.props;

        const submitCallback = handleSubmit(((values)=> {
            this.submit(values);
        }).bind(this));

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <form>
                            <Paper style={pageStyle} zDepth={3}>
                                <div >
                                    <div style={{padding: '5px'}}>
                                        <div>&nbsp;</div>
                                    </div>
                                </div>
                                <div>
                                    <Field name="userName" hintText="" floatingLabelText={Resource.login.userName}
                                           component={TextField}
                                           ref="userName" withRef/>
                                </div>
                                <div>
                                    <Field name="password" hintText="" floatingLabelText={Resource.login.password}
                                           type="password"
                                           component={TextField}/>
                                </div>
                                <RaisedButton
                                    disabled={submitting}
                                    label={Resource.common.button.submit}
                                    labelPosition="after"
                                    onTouchTap={submitCallback}
                                    primary={true}
                                    icon={<ActionIcon />}
                                    style={styles.button}/>

                                <div style={{margin: '3px auto'}}>
                                    <a href="#">{Resource.login.forgotPassword} </a>
                                </div>
                            </Paper>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

LoginPanel.propTypes = {
    login: PropTypes.func,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool
};

// <----- THIS IS THE IMPORTANT PART!
const form = reduxForm({
    form: 'loginForm', // a unique name for this form
    validate
})(LoginPanel);

export default form;