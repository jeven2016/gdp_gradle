import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {export_summary} from '../../global/ServiceURL'
import {querySummary} from './actions/StatsAction'
import SummaryChart from './SummaryChart'
import {appendParams} from '../../utlis/HttpUtils'
import {SUMMARY_TYPE_WEEK, SUMMARY_TYPE_MONTH} from './actions/ActionTypes'
import Data from './chart_examples/TestData';

class Summary extends Component {
    componentDidMount() {
    }

    getExportBtn() {
        const {subscriber, policyName, start, end} = this.context;
        let url = appendParams(export_summary, {
            subscriber: subscriber,
            policyName: policyName,
            start: start,
            end: end
        });

        return (<div>
            <a href={url} download="summary.xlsx" target="_blank" className="button">
                Export summary data
            </a>
        </div>);
    }

    render() {
        // let policyName = this.context.policyName;
        const {onSummaryTypeChange, summaryType}  = this.context;

        return (
            <div>
                <div className="form">
                    <div className="form-item inline">
                        {this.getExportBtn()}
                    </div>
                </div>
                <div className="card border" style={{width: '100%'}}>
                    <div className="card-header gray">
                        <i className="fa fa-line-chart">&nbsp;</i>
                        <span className="title"
                              style={{lineHeight: '2.25rem'}}> {summaryType === SUMMARY_TYPE_WEEK ? "Weekly Summary" : "Monthly Summary"}</span>
                        <span className="pull-right" style={{fontSize: '18px', color: '#3d8bea', cursor: 'pointer'}}>
                            <div className="button-group clear-border">
                                <button className={summaryType == SUMMARY_TYPE_WEEK ? "primary button" : "button"}
                                        title="Weekly Summary"
                                        onClick={(evt) => onSummaryTypeChange(evt, SUMMARY_TYPE_WEEK)}>
                                    <i className="fa fa-th"/>
                                </button>
                                <button className={summaryType == SUMMARY_TYPE_MONTH ? "primary button" : "button"}
                                        title="Monthly Summary"
                                        onClick={(evt) => onSummaryTypeChange(evt, SUMMARY_TYPE_MONTH)}>
                                    <i className="fa fa-calendar-check-o"/>
                                </button>
                            </div>
                        </span>
                    </div>
                    <div className="card-body">
                        <h1>Policy execution chart</h1>
                        <div className="text comment" style={{margin: 'auto'}}>
                            The following diagram indicates the policies execution count within given period
                        </div>
                        <SummaryChart summary={Data}/>
                    </div>
                </div>
            </div>

        )
    }
}

Summary.propTypes = {
    summary: PropTypes.object
};

//retrieve the context passed from its parent component
Summary.contextTypes = {
    subscriber: PropTypes.string,
    policyName: PropTypes.string,
    start: PropTypes.number,
    end: PropTypes.number,

    summaryType: PropTypes.string,
    onSummaryTypeChange: PropTypes.func
};

//将state绑定到props
const mapStateToProps = (state) => {
    return {
        summary: state.summary
    }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators([querySummary], dispatch)
};

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default connect(mapStateToProps, mapDispatchToProps)(Summary)
