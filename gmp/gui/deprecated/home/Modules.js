/**
 * Created by zjtech on 16-8-6.
 */
import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import LeftArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';


import ModuleSelect from './ModuleSelect'
import ModuleList from './ModuleList'

export default class Modules extends Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-1">
                        {/*   <FloatingActionButton mini={true} zDepth={0}>
                         <LeftArrow/>
                         </FloatingActionButton>*/}
                    </div>
                    <div className="col-md-10">
                        {/*<ModuleSelect/>*/}
                        <ModuleList />
                    </div>
                    <div className="col-md-1">
                        {/*    <FloatingActionButton mini={true} zDepth={0}>
                         <RightArrow/>
                         </FloatingActionButton>*/}
                    </div>
                </div>
            </div>
        );
    }

}
