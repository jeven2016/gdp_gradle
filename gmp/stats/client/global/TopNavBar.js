/**
 * Created by zjtech on 16-7-29.
 */
import React, {Component} from "react";

export default class TopNavBar extends Component {
    render() {
        return (<div>
            <ul className="animated fadeIn shadow primary navbar fixed top" style={{width: '100%'}}>
                <li className="item title">Stats Inquiry System</li>
            </ul>
        </div>);
    }

}