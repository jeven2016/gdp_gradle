const LoaderMiddleware = store => next => (action) => {
    store.getState()
    return next(action);

    // window.console.log("befor");
    /* let result = next(action);
     window.console.log(result);
     window.console.log("after, state=" + store.getState());
     */
};

export default LoaderMiddleware;
