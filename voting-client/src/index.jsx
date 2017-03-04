import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setState} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import App from './components/App';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';

// connects to the backend via socket.io
const socket = io(`${location.protocol}//${location.hostname}:8090`);
// sets the state received from the backend
socket.on('state', state =>
  store.dispatch(setState(state))
); 

// applyMiddleware uses currying to create the midleware layer: socket => store => next => action =>
const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);

// react-router has two routes. 
const routes = <Route component={App}>
    <Route path="/results" component={ResultsContainer} />
    <Route path="/" component={VotingContainer} />
</Route>;

// Renders the whole thing into dist/inex.html
ReactDOM.render(
   <Provider store={store}>
  <Router history={hashHistory}>{routes}</Router>
   </Provider>,
  document.getElementById('app')
);