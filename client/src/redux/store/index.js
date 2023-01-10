import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/index.js';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const store =  createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
//  const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//  const store = createStore(rootReducer, composeEnhacers(applyMiddleware(thunk)));

export default store;