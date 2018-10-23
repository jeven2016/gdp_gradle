import  'whatwg-fetch'

export default function fetchHelper(fetch_promise, timeout) {
    var abort_fn = null;

    //create a promise that can be rejected
    var abort_promise = new Promise(function (resolve, reject) {
        abort_fn = function () {
            reject('abort promise');
        };
    });

    //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
    var abortable_promise = Promise.race([
        fetch_promise,
        abort_promise
    ]);

    setTimeout(function () {
        abort_fn();
    }, timeout);

    return abortable_promise;
}