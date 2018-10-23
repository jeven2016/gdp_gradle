let moment =require('moment');


let now  = moment().format();
console.log("now= %s",now);

var day = moment('2016-1-14','YYYY-MM-DD').format();
console.log("day= %s",day);