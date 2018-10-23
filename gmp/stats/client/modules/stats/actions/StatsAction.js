import filter from 'lodash/filter'
import is from 'is_js'
import {
    QUERY_RAW_DATA,
    QUERY_POLICIES,
    QUERY_SUMMARY,
    SUMMARY_TYPE_MONTH,
    SUMMARY_TYPE_WEEK,
    FILTER_POLICIES
} from './ActionTypes'
import {query_raw_data, query_policies_list, query_weekly_summary, query_monthly_summary} from '../../../global/ServiceURL'
import {appendParams} from '../../../utlis/HttpUtils'
require('es6-promise').polyfill();
require('isomorphic-fetch');


/**
 * Query raw data
 * @param queryParameters
 */
export const queryRawData = (queryParameters) => {
    let url = appendParams(query_raw_data, queryParameters, ['summaryType']);

    /*let request = new Request(url, {
     method: 'GET',
     mode: 'cors',
     redirect: 'follow',
     headers: new Headers({
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': '"POST, GET, PUT, OPTIONS, PATCH, DELETE"',
     'Access-Control-Allow-Headers': 'X-Accept-Charset,X-Accept,Content-Type',
     'Access-Control-Allow-Credentials': 'true'
     })
     });*/

    return (dispatch) => {
        fetch(url).then(response => {
            if (response.status >= 400) {
                throw new Error(`Bad response and the status code is ${response.status}`);
            }
            return response.json();//return a Promise object
        }).then(data => {
            dispatch({type: QUERY_RAW_DATA, result: data});
        }).catch(error => {
            dispatch({type: QUERY_RAW_DATA, error: error, result: {page: 0, size: 0, totalPages: 0, data: []}});
        });
    }

};

/**
 * Query all policies
 * @returns {function(*)}
 */
export const queryPolicies = () => {
    // return {type: QUERY_POLICIES, result: defaultPolicies};
    return (dispatch) => {
        fetch(query_policies_list).then(response => {
            if (response.status >= 400) {
                throw new Error(`Bad response and the status code is ${response.status}`);
            }
            return response.json();//return a Promise object
        }).then(data => {
            dispatch({type: QUERY_POLICIES, result: data});
        }).catch(error => {
            dispatch({type: QUERY_POLICIES, result: [], error: error});
        });
    }
};

export const filterPolicies = (policies, value) => {
    let filteredPolicies = filter(policies, item => {
        return new RegExp(value, "i").test(item);
    });
    return {
        type: FILTER_POLICIES,
        result: filteredPolicies
    }
};

/**
 * Query the summary data with search criteria
 * @returns {function(*)}
 */
export const querySummary = (queryParameters) => {
    let url;
    let summaryType = queryParameters.summaryType;

    if (is.not.existy(summaryType) || is.not.string(summaryType)) {
        throw new Error(`the summary(${summaryType}) is invalid.`);
    }

    if (is.equal(summaryType, SUMMARY_TYPE_WEEK)) {
        url = query_weekly_summary;
    }

    if (is.equal(summaryType, SUMMARY_TYPE_MONTH)) {
        url = query_monthly_summary;
    }

    url = appendParams(url, queryParameters, ['page', 'limit', 'summaryType']);
    return (dispatch) => {
        fetch(url).then(response => {
            if (response.status >= 400) {
                throw new Error(`Bad response and the status code is ${response.status}`);
            }
            return response.json();//return a Promise object
        }).then(data => {
            dispatch({type: QUERY_SUMMARY, result: data, summaryType: summaryType});
        }).catch(error => {
            dispatch({type: QUERY_SUMMARY, result: {}, summaryType: summaryType, error: error});
        });
    }
};
