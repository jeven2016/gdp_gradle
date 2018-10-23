/**
 * Created by zjtech on 16-8-9.
 */
import React, {Component, PropTypes} from 'react'

export default class FontIcon extends Component {
    render() {
        const {className, size = 1} = this.props;
        let fontSize = '1g';
        if (size > 1) {
            fontSize = `${size}x`;
        }

        return (
            <i {...this.props} className={` icon fa fa-${className} fa-${fontSize}`}>
            </i>
        );
    }
}

FontIcon.propTypes = {
    className: PropTypes.string.isRequired,
    size: PropTypes.number
};

