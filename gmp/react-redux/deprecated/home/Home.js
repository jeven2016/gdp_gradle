/**
 * Created by zjtech on 16-7-25.
 */
import React, {Component, PropTypes} from 'react'


//模块只有一个输出值，就使用export default
export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                dsfd,hellollllll
            </div>
        );
    }
}

Home.propTypes = {
    children: PropTypes.object
};