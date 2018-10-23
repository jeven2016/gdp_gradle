import React, {Component} from 'react'
import {login} from './LoginAction'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as LoginActions from './LoginAction'
import {isEmptyString} from '../../utlis/CommonValidators'
import {preventEvent} from 'react-wui/EventHandlers'

export class Login extends Component {
    constructor(args) {
        super(args);
        this.state = {
            username: "",
            password: "",

            showUsernameError: false,
            showPasswordError: false,

            error: null
        }
    }

    updateUsername(evt) {
        let username = evt.target.value;
        this.setState({
            username: username,
            showUsernameError: isEmptyString(username)
        });
    }

    updatePwd(evt) {
        let password = evt.target.value;
        this.setState({
            password: password,
            showPasswordError: isEmptyString(password)
        });
    }

    signIn(evt) {
        preventEvent(evt);

        const {login} = this.props;
        let isValidUsername = true;
        let isValidPassword = true;
        let error = null;


        if (isEmptyString(this.state.username)) {
            isValidUsername = false;
        }

        if (isEmptyString(this.state.password)) {
            isValidPassword = false;
        }

        if (isValidUsername && isValidPassword) {
            login(this.state.username, this.state.password);
            return;
        }

        error = 'Incorrect username or password.';
        this.setState({
            showUsernameError: !isValidUsername,
            showPasswordError: !isValidPassword,
            error: error
        });
    }

    render() {
        const {showUsernameError, showPasswordError, error}  = this.state;
        let usernameCls = showUsernameError ? "large input form-line input-error" : "large input form-line";
        let passwordCls = showPasswordError ? "large input form-line input-error" : "large input form-line";
        let errorMsg = this.props.error ? this.props.error : error;

        return (
            <div>
                <div className="row">
                    <div className="col-xs-24 offset-sm-6 col-sm-12 offset-md-8 col-md-8  offset-lg-8 col-lg-8">
                        <div className='animated  tada' style={{marginTop: '200px'}}>
                            <div className="block card border login-container-example">
                                {/* <div className="card-header gray">
                                 <span className="title"> Welcome</span>
                                 </div>*/}
                                <div className="card-body">
                                    <form className="form " style={{padding: '0 1rem', marginTop: '1.5rem'}}>
                                        <div className="form-item pull-center">
                                            <input type="text" className={usernameCls}
                                                   placeholder="Username"
                                                   value={this.state.username}
                                                   onChange={::this.updateUsername}/>
                                        </div>
                                        <div className="form-item pull-center">
                                            <input type="password" className={passwordCls}
                                                   value={this.state.password}
                                                   onChange={::this.updatePwd}
                                                   placeholder="Password"/>
                                        </div>
                                        <div className="form-item pull-center" style={{color: '#ff350e'}}>
                                            {errorMsg}
                                        </div>
                                        <div className="form-item pull-center">
                                            <button className="large button primary block" onClick={::this.signIn}>Sign In
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(LoginActions, dispatch)
};

const mapStateToProps = (state = {loginResult: {username: null, token: null, error: null}}) => {
    return state.loginResult;
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(Login)