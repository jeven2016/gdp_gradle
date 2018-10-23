import {QUERY_RAW_DATA, QUERY_POLICIES, QUERY_SUMMARY, FILTER_POLICIES} from '../actions/ActionTypes'

export const rawData = (state = {page: 0, size: 0, totalPages: 0, data: []}, action) => {
    switch (action.type) {
        case QUERY_RAW_DATA: {
            let queryResult = action.result;
            return Object.assign({}, state, {
                page: queryResult.page,
                size: queryResult.size,
                totalPages: queryResult.totalPages,
                data: queryResult.data
            });
        }
        default:
            return state;
    }
};

/**
 * copy all policies to state for selection
 * @param state
 * @param action
 * @returns {*}
 */
export const policies = (state = [], action)=> {
    switch (action.type) {
        case  QUERY_POLICIES:
            return [...action.result];
        default:
            return state;
    }
};

export const filteredPolicies = (state = [], action)=> {
    switch (action.type) {
        case FILTER_POLICIES:
            return [...action.result];
        default:
            return state;
    }
};

/**
 * The stats summary
 * @param state
 * @param action
 * @returns {*}
 */
export const summary = (state = {time: [], data: {}}, action) => {
    switch (action.type) {
        case  QUERY_SUMMARY:
            return Object.assign({}, state, {
                time: action.result.time,
                data: action.result.data,
                summaryType: action.summaryType
            });
        default:
            return state;
    }
};