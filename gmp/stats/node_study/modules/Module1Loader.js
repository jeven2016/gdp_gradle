/*exports 实际上只是一个和 module.exports 指向同一个对象的变量，
 它本身会在模块执行结束后释放，但 module 不会，因此只能通过指定 module.exports 来改变访问接口*/
var module = require('./Exports');
console.log(module.sayHello());
console.log(module.sayWhy());

console.log(require('./Exports').sayHello());

var moduleExports = require('./ModuleExports');
console.log(moduleExports.sayExport());
console.log(moduleExports.sayWhere());


// import { default as foo } from "foo";