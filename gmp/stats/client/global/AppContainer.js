/**
 * Created by zjtech on 16-7-29.
 */
import React, {Component, PropTypes} from "react";
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
// import Dialog from "../widgets/Dialog"
import * as AppActions from './AppActionTypes'
import TopNavBar from './TopNavBar'
/**
 * Main entry of this application
 */
class AppContainer extends Component {

    render() {
        return (
            <div>
                {/*<Dialog title="Warning" content="This is a warning" onClose={null}/>*/}
                <TopNavBar/>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

AppContainer.propTypes = {
    children: PropTypes.object
};

//将state绑定到props
const mapStateToProps = (state)=> {
    return {
        warningMessage: state.warningMessage
    }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch)=> {
    return bindActionCreators(AppActions, dispatch)
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)