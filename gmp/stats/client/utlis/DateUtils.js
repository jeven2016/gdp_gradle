import {isNull, isUndefined} from 'lodash'

let DateUtils = {

    clone: function (date) {
        let clonedDate = new Date();
        clonedDate.setFullYear(date.getFullYear());
        clonedDate.setMonth(date.getMonth());
        clonedDate.setDate(date.getDate());
        clonedDate.setHours(date.getHours());
        clonedDate.setMinutes(date.getMinutes());
        clonedDate.setSeconds(date.getSeconds());
        return clonedDate;
    },

    updateTime: function (date, {hour, min, second}) {
        if (!isNull(hour) && !isUndefined(hour)) {
            date.setHours(hour);
        }

        if (!isNull(min) && !isUndefined(min)) {
            date.setMinutes(min);
        }

        if (!isNull(second) && !isUndefined(second)) {
            date.setSeconds(second);
        }
        return date;
    }
};

export default DateUtils;