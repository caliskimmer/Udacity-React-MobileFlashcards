const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.log('The action: ', action);
    console.log('Return value: ', next(action));
    console.log('The new state: ', store.getState());
    console.groupEnd();
};

export default logger;