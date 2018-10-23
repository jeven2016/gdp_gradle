import is from 'is_js'

export const isEmptyValue = (value) => {
    return is.empty(value);
};

export const isEmptyString = (value) => {
    return value == null || (is.string(value) && /^\s*$/.test(value));
};

export const isArray = (value) => {
    return is.array(value);
};

export const isNotArray = (value) => {
    return is.not.array(value);
};

export const isEmptyArray = (value) => {
    return is.array(value) && is.empty(value);
};
