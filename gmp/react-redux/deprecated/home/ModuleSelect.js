/**
 * Created by zjtech on 16-8-8.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Popover, PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

export default class ModuleSelect extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    handleTouchTap(event) {
        // This prevents ghost click.
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    }

    handleRequestClose() {
        this.setState({
            open: false,
        });
    }

    render() {
        return (
            <div>
                <div>
                    <RaisedButton
                        onTouchTap={this.handleTouchTap.bind(this)}
                        label="当前:服务器管理"/>
                    <Popover
                        open={this.state.open}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        onRequestClose={this.handleRequestClose.bind(this)}
                        animation={PopoverAnimationVertical}
                    >
                        <Menu>
                            <MenuItem primaryText="用户管理"/>
                            <MenuItem primaryText="系统管理"/>
                            <MenuItem primaryText="服务器管理"/>
                            <MenuItem primaryText="权限管理"/>
                        </Menu>
                    </Popover>
                </div>
                <div>

                </div>
            </div>

        );
    }
}