import makeStore from './src/store';
import { startServer } from './src/server';
// it all starts from here
export const store = makeStore();
startServer(store);
//dispatch the initial set of entries
store.dispatch({
    type: 'SET_ENTRIES',
    entries: require('./entries.json')
});
// setup the vote
store.dispatch({ type: 'NEXT' });