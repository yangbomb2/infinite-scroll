/**
 * Store Index
 *
 * create center store
 */

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import reducers from '../reducer';

// https://github.com/supasate/connected-react-router
import { connectRouter, routerMiddleware } from 'connected-react-router'


// Note, connected router doesn't suppor basename
// https://github.com/ReactTraining/react-router/issues/4801

// history
const history = createBrowserHistory({basename: '/demo/infinite-scroll/'});

// middlewares
const loggerMiddleware = createLogger();
const rmw = routerMiddleware(history);

const middlewares = applyMiddleware(
  rmw,
  thunkMiddleware, //  lets us dispatch() functions
  loggerMiddleware //  neat middleware that logs actions
);

// combine reduders(this will be props)
const rootReducer = combineReducers(reducers);

const store = createStore(
  connectRouter(history)(rootReducer), // new root reducer with router state
  compose(middlewares)
);

export { history }
export default store;
