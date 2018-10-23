import React, {Component, PropTypes} from "react";

export default class Dialog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let display = this.props.visible ? "" : "none";
        return (
            <div className="dialog primary" style={{display: display}}>
                <div className="content clear-radius">
                    <div className="header">
                        <div className="title">{this.props.title}</div>
                        <div className="icon">
                            <i className="fa fa-close"></i>
                        </div>
                    </div>
                    <div className="body">
                        {this.props.content}
                    </div>
                    <div className="footer">
                        <div align="right">
                            <button className="button primary">
                                <i className="fa fa-yelp"></i>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dialog.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.oneOf([PropTypes.element, PropTypes.node])
};