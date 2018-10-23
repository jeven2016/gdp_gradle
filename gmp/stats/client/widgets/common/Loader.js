import React, {Component, PropTypes} from 'react'

export default class Loader extends Component {
    render() {
        return (
            <div className={this.props.show ? "loader active" : "loader"}>
            </div>
        );
    }
}

Loader.propTypes = {
    show: PropTypes.bool
};