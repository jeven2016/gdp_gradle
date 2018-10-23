/**
 * Created by root on 16-9-12.
 */
import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import Policy from './Policy'
import DateTimePicker from 'react-wui/DateTimePicker'
import Table from 'react-wui/Table'
// import Loader from '../../widgets/common/Loader'
import {preventEvent} from 'react-wui/EventHandlers'
import {List} from 'immutable'
import Tab from 'react-wui/Tab'
import Pagination from 'react-wui/Pagination'
import Summary from '../Summary'
import {SUMMARY_TYPE_WEEK} from '../actions/ActionTypes'
let tabType = {
    rawData: 'rawData',
    summary: 'summary'
};

function fluent(target, name, descriptor) {
    const method = descriptor.value;

    descriptor.value = function (...args) {
        return method.apply(this, args);
    }
}

export default class StatsIndex extends Component {
    static childContextTypes = {
        subscriber: PropTypes.string,
        policyName: PropTypes.string,
        start: PropTypes.number,
        end: PropTypes.number,
        limit: PropTypes.number,
        page: PropTypes.number,

        summaryType: PropTypes.string,
        onSummaryTypeChange: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            subscriber: "",
            policyName: List(),
            start: null,
            end: null,
            showLoader: false,

            showQueryResult: false,
            summaryType: SUMMARY_TYPE_WEEK,
            activeItem: tabType.rawData
        };
    }

    getChildContext() {
        return {
            subscriber: this.state.subscriber,
            policyName: this.state.policyName.toArray().join(','),
            start: this.state.start,
            end: this.state.end,
            limit: 10,
            page: 1,

            summaryType: this.state.summaryType,
            onSummaryTypeChange: ::this.querySummaryData
        };
    }

    @fluent
    getQueryParam() {
        let queryParameter = {
            subscriber: this.state.subscriber,
            policyName: this.state.policyName.toArray().join(','),
            start: this.state.start,
            end: this.state.end,
            limit: 10,
            page: 1,

            summaryType: this.state.summaryType
        };
        return queryParameter;
    }

    updateSubscriber(evt) {
        this.setState({subscriber: evt.target.value});
    }

    getLatestMomentDate(previousMomentDate, momentDate) {
        let newMomentDate;
        if (previousMomentDate) {
            //only change the year,month and date part
            newMomentDate = moment({
                y: momentDate.year(),
                M: momentDate.month(),
                d: momentDate.date(),
                h: previousMomentDate.hour(),
                m: previousMomentDate.minutes(),
                s: previousMomentDate.seconds()
            });
        } else {
            newMomentDate = moment({
                y: momentDate.year(),
                M: momentDate.month(),
                d: momentDate.date(),
                h: 0,
                m: 0,
                s: 0
            });
        }
        return newMomentDate;
    }

    getLatestMomentTime(previousMomentDate, momentDate) {
        let newMomentDate;
        if (previousMomentDate) {
            //only change the hour,minute and second part
            newMomentDate = previousMomentDate.clone();
            newMomentDate.hour(momentDate.hour());
            newMomentDate.minute(momentDate.minute());
            newMomentDate.second(momentDate.second());
        } else {
            newMomentDate = momentDate;
        }
        return newMomentDate;
    }

    changeStartDate(momentDate) {
        if (!momentDate) {
            this.setState({start: null});
            return;
        }
        let latestMomentDate = this.getLatestMomentDate(this.state.start, momentDate);
        this.setState({start: latestMomentDate});
    }

    changeStartTime(momentDate) {
        if (!momentDate) {
            this.setState({start: null});
            return;
        }
        let latestMomentDate = this.getLatestMomentTime(this.state.start, momentDate);
        this.setState({start: latestMomentDate});
    }

    changeEndDate(momentDate) {
        if (!momentDate) {
            this.setState({end: null});
            return;
        }
        let latestMomentDate = this.getLatestMomentDate(this.state.end, momentDate);
        this.setState({end: latestMomentDate});
    }

    changeEndTime(momentDate) {
        if (!momentDate) {
            this.setState({end: null});
            return;
        }
        let latestMomentDate = this.getLatestMomentTime(this.state.end, momentDate);
        this.setState({end: latestMomentDate});
    }

    resetForm() {
        this.setState({subscriber: ''});
        this.setState({start: null});
        this.setState({end: null});
        this.setState(({policyName}) => ({
            policyName: policyName.clear()
        }));
    }

    search(evt, activatedItem) {
        this.setState({showLoader: true});
        this.setState({showQueryResult: true});
        preventEvent(evt);

        let params = this.getQueryParam();
        activatedItem = activatedItem ? activatedItem : this.state.activeItem;
        if (activatedItem === tabType.summary) {
            //query the summary data
            const {querySummary} = this.props;
            querySummary(params);
        } else {
            //query the raw data
            const {queryRawData} = this.props;
            queryRawData(params);
        }
    }

    /*
     setState does not immediately mutate this.state but creates a pending state transition.
     Accessing this.state after calling this method can potentially return the existing value.
     */
    querySummaryData(evt, summaryType) {
        this.setState({summaryType: summaryType}, () => this.search());
    }

    queryPolicies() {
        const {queryPolicies} = this.props;
        queryPolicies();
    }

    selectPolicy(policy) {
        //import policy name array first form state and push the selected policy into
        //the array and return a new policy name immmutable object.
        //the following code line written with ES6 , please refer to immutable.js guide for more information.
        this.setState(({policyName}) => ({
            policyName: policyName.push(policy)
        }));
    }

    removePolicy(removedPolicyName) {
        this.setState(({policyName}) => ({
            policyName: policyName.filter(policy => {
                return policy !== removedPolicyName
            })
        }));
    }

    filterPolicy(value) {
        const {policies, filterPolicies} = this.props;
        filterPolicies(policies, value);
    }

    goNext() {
        let currentPage = this.props.rawData.page,
            totalPages = this.props.rawData.totalPages;

        currentPage++;
        if (currentPage >= totalPages) {
            this.goTo(totalPages);
        } else {
            this.goTo(currentPage);
        }
    }

    goPrevious() {
        let currentPage = this.props.rawData.page;
        currentPage--;

        if (currentPage <= 0) {
            return this.goTo(1);
        } else {
            return this.goTo(currentPage);
        }
    }

    goTo(nextPage) {
        const {queryRawData} = this.props;
        let queryParameter = this.getQueryParam();
        queryParameter.page = nextPage;
        queryRawData(queryParameter);
    }

    generatePaginationBar() {
        return (<Pagination
            totalPages={this.props.rawData.totalPages}
            currentPage={parseInt(this.props.rawData.page)}
            goTo={::this.goTo}
            goPrevious={::this.goPrevious}
            goNext={::this.goNext}
        />);
    }

    getPaginationBar() {
        if (this.state.activeItem == 'summary' || this.props.rawData.totalPages <= 0) {
            return null;
        }
        return (<div>
            {this.generatePaginationBar()}
            <div style={{
                display: 'inline-block',
                marginTop: '0.5rem',
                float: 'right',
                verticalAlign: 'middle',
                lineHeight: '1.75rem'
            }}>
                Total {this.props.rawData.totalPages}
                &nbsp;pages, {this.props.rawData.totalPages * this.props.rawData.size}&nbsp;entries
            </div>
        </div>);
    }

    changeTab(id, evt) {
        this.setState({activeItem: id});
        this.search(evt, id);
    }

    getTab() {
        return (<Tab
            items={[
                {
                    id: tabType.rawData,
                    label: 'Raw Data',
                    icon: <i className="fa fa-table"/>,
                    content: <Table data={this.props.rawData.data}/>
                },
                {
                    id: tabType.summary,
                    label: 'Summary',
                    icon: <i className="fa fa-list"/>,
                    content: <Summary/>
                }
            ]}
            activeItem={this.state.activeItem}
            defaultActiveItem="rawData"
            onChange={::this.changeTab}
        />);
    }

    render() {
        let queryResult = null;
        if (this.state.showQueryResult) {
            queryResult = (<div>
                <div>
                    {this.getTab()}
                </div>
                {this.getPaginationBar()}
            </div>);
        }

        return (
            <div>
                {/*<Loader show={this.state.showLoader}/>*/}
                <div className="row stats-container">
                    <div className="col-xs-24 col-sm-24 col-md-18 offset-md-3 content-area">
                        <div className="form">
                            <div className="form-item row">
                                <div className="col-xs-24 col-sm-12">
                                    <label> Subscriber:</label>
                                    <input type="text"
                                           value={this.state.subscriber}
                                           onChange={::this.updateSubscriber}
                                           className="input form-line" placeholder="Subscriber"/>
                                </div>
                                <div className="col-xs-24 col-sm-12">
                                    <label> Policy:</label>
                                    <Policy onClick={::this.queryPolicies}
                                            items={this.props.policies}
                                            filteredItems={this.props.filteredPolicies}
                                            onItemSelected={::this.selectPolicy}
                                            onRemoveItem={::this.removePolicy}
                                            onSearch={::this.filterPolicy}
                                            seletedItems={this.state.policyName.toArray()}/>
                                </div>
                            </div>
                            <div className="form-item row">
                                <div className="col-xs-24 col-sm-12">
                                    <label> Start Date:</label>
                                    <DateTimePicker value={this.state.start}
                                                    onDateChange={::this.changeStartDate}
                                                    onTimeChange={::this.changeStartTime}/>
                                </div>
                                <div className="col-xs-24 col-sm-12">
                                    <label> End Date:</label>
                                    <DateTimePicker value={this.state.end}
                                                    onDateChange={::this.changeEndDate}
                                                    onTimeChange={::this.changeEndTime}/>
                                </div>
                            </div>
                            <div className="form-item row">
                                <div className="col-xs-24">
                                    <div className=" pull-right " style={{marginTop: '0.5rem'}}>
                                        <button onClick={::this.search} className="primary button">
                                            <i className="fa fa-search">&nbsp;</i> Search
                                        </button>
                                        &nbsp;
                                        <button onClick={::this.resetForm} className="button" type="reset">
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {queryResult}
                    </div>
                </div>
            </div>
        )
    }
}

StatsIndex.propTypes = {
    queryRawData: PropTypes.func,
    queryPolicies: PropTypes.func,
    filterPolicies: PropTypes.func,
    querySummary: PropTypes.func,

    policies: PropTypes.arrayOf(PropTypes.string),
    rawData: PropTypes.shape({
        page: PropTypes.number,
        totalPages: PropTypes.number,
        size: PropTypes.number,
        data: PropTypes.array
    })
};


//todo: immutable 如何创建state对象，是整个对象设置成immutable对象，还是依据参数一个个设置
//todo: immutable对象如何进行propTypes校验
//todo:redux   dispatch multiple action
//todo: router 异步加载及打包，hash history