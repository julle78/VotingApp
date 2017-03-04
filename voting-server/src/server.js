import Server from 'socket.io';

export function startServer(store) {
    const io = new Server().attach(8090);

    // adds a listener to the store 
    // listener is called any time an action was dispatched
    store.subscribe(
        // the socket.io server emits the current state of the store
        () => io.emit('state', store.getState().toJS())
    );

    // when a client connects to the server it well recieve the latest state
    // all clients emit an action message when their state changes
    io.on('connection', (socket) => {
        socket.emit('state', store.getState().toJS());
        socket.on('action', store.dispatch.bind(store));
    });
}