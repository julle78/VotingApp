export default socket => store => next => action => {
    // if action has the remote flag the middleware emits the action before dispatching it to redux
    if (action.meta && action.meta.remote) {
        socket.emit('action', action);
    }
    return next(action);
};