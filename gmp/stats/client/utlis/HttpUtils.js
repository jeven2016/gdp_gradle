import is from 'is_js'

/**
 * Append the parameters to URL string
 * @param url URL
 * @param param parameters object
 */
export function appendParams(url = "", param, excludeFields = []) {
    if (is.existy(url) && is.not.string(url)) {
        throw new Error(`the url should be a string value(${url})`);
    }

    if (is.existy(param) && is.not.object(param)) {
        throw new Error(`the params is invalid and it should be a plain javascript object(${param})`);
    }

    let paramString = "";
    Object.keys(param).forEach(key => {
        let isExcluded = excludeFields.findIndex(value=>is.equal(key, value)) > -1;
        if (isExcluded) {
            return;
        }

        let value = param[key];
        if (is.not.existy(value) || is.empty(value) || /^\s+/.test(value)) {
            return;
        }

        paramString += `&${key}=${value}`;
    });

    if (is.empty(url) && is.startWith(paramString, '&')) {
        return paramString.substring(1);
    }

    if (is.include(url, '?')) {
        return `${url}${paramString}`;
    }

    return `${url}?${paramString.substring(1)}`;
}

/**
 * Get the string joined with different parameters
 * @param param parameters object
 */
export function getParamsString(param) {
    return appendParams(null, param);
}