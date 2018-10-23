/**
 * Created by zjtech on 16-8-8.
 */
import React, {Component, PropTypes} from "react";
import {Row, Col} from "antd";
import QueueAnim from 'rc-tween-one'
import  SliderBarContainer from './SliderBarContainer'
import TopNavBar from './TopNavBar'
import UserInfo from './subcomponents/UserInfo'
import Drawer from 'Drawer'
import {connect} from 'react-redux'
import * as actions from './HomeAction'
import {bindActionCreators} from 'redux'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDrawer: false
        }
    }

    showDrawerHandler(showDrawer) {
        this.setState({
            showDrawer: showDrawer
        })
    }

    selectItem(link, module) {
        const {navigateTo}  = this.props;
        navigateTo(link, module);
        this.setState({
            showDrawer: false
        })
    }

    render() {
        return (
            <div>
                <Row align="top">
                    <Col sm={6} md={5} lg={4} className="left-container">
                        <Drawer visible={this.state.showDrawer}
                                children={<SliderBarContainer rootClass="slider-bar slider-bar-secondary"
                                                              menuTheme="dark"
                                                              selectItem={this.selectItem.bind(this)}
                                                              clickBlankSpace={this.showDrawerHandler.bind(this)}/>
                                }/>
                        <UserInfo showDrawerHandler={this.showDrawerHandler.bind(this)}/>
                        <SliderBarContainer selectItem={this.selectItem.bind(this)}/>
                    </Col>
                    <Col sm={18} md={19} lg={20} className="middle-container">
                        <TopNavBar/>
                        <div className="content">
                            <div className="content-body">
                                <QueueAnim type={['right', 'left']}>
                                    {this.props.children}
                                </QueueAnim>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
        //es: Extra small devices Phones (<768px)
        //sm: Small devices Tablets (≥768px)
        //md: Medium devices Desktops (≥992px)
        //lg: Large devices Desktops (≥1200px)
    }
}

Home.propTypes = {
    children: PropTypes.object,
    navigateTo: PropTypes.func,
    homeState: PropTypes.object
};

//将state绑定到props
const mapStateToProps = (state)=> {
    return {
        homeState: state.homeState //this corresponds to function name of reducer
    }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch)=> {
    return bindActionCreators(actions, dispatch)
};


//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(Home)
