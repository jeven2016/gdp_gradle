export const serviceUrl = "http://10.113.12.25:5801";

/**
 * Login
 * @type {string}
 */
export const login_url=`${serviceUrl}/login`;

/**
 * query list of policy name
 * @type {string}
 */
export const query_policies_list = `${serviceUrl}/policies`;

/**
 * query the raw data in data store support pagination
 * @type {string}
 */
export const query_raw_data = `${serviceUrl}/stats/rawdata`;

/**
 * query summary of raw data
 * @type {string}
 */
export const query_weekly_summary = `${serviceUrl}/summary?countBy=hour`;
export const query_monthly_summary = `${serviceUrl}/summary?countBy=day`;

/**
 * export the summary data.
 * @type {string}
 */
export const export_summary = `${serviceUrl}/export`;
