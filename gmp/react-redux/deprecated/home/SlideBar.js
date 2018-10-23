/**
 * Created by zjtech on 16-8-4.
 */
import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import FontIcon from 'material-ui/FontIcon';

import AppIcon from "material-ui/svg-icons/navigation/apps";
import FavoriteIcon from "material-ui/svg-icons/action/favorite";

import Modules from './Modules'

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    slide: {
       // padding: 10,
    },
};

export default class SlideBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
    }

    handleChange(value) {
        this.setState({
            slideIndex: value,
        });
    }

    render() {
        return (
            <div>
                <Tabs
                    onChange={this.handleChange.bind(this)}
                    value={this.state.slideIndex}>
                    <Tab value={0} icon={<FavoriteIcon />} title="我的收藏夹"/>
                    <Tab value={1} icon={<AppIcon/>} title="全部模块"/>
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}>
                    <div>
                        <h2 style={styles.headline}>Tabs with slide effect</h2>
                        Swipe to see the next slide.<br />
                    </div>
                    <div style={styles.slide}>
                        <Modules/>
                    </div>
                </SwipeableViews>
            </div>
        );
    }
}