/**
 * Created by zjtech on 16-7-29.
 */
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as LoginActions from './LoginAction'
import LoginPanel from './LoginPanel'


//将state绑定到props
const mapStateToProps = (state)=> {
    return {
        loginResult: state.LoginReducer
    }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch)=> {
    return bindActionCreators(LoginActions, dispatch)
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(LoginPanel)



