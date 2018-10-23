import React, {Component} from 'react'

export default class Dropdown extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="button-dropdown">
                <button className="button">
                    <strong>Select...</strong>&nbsp;
                    <i className="icon fa fa-angle-down"></i>
                </button>
                <div className="menu">
                    <div className="item text align-left" data-value="0"><i className="fa fa-cab"></i> &nbsp;China</div>
                    <li className="divider"></li>
                    <div className="item text align-left" data-value="1"><i className="fa fa-cab"></i> &nbsp;USA</div>
                    <li className="divider"></li>
                    <a className="item text align-left" data-value="1" href="#"><i className="fa fa-cab"></i> &nbsp;Link</a>
                    <li className="divider"></li>
                    <div className="item text align-left" data-value="2"><i className="fa fa-cab"></i> &nbsp;Russian
                    </div>
                </div>
            </div>
        )
    }

}