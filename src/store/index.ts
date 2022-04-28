import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
// import { routerMiddleware } from 'react-router-redux';
import { rootReducer } from './reducer';

import { createHashHistory } from 'history';

const composeEnhancers = composeWithDevTools({});

const history = createHashHistory();
const middleware = [];
middleware.push(ReduxThunk);
// const router = routerMiddleware(history);
// middleware.push(router);

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */

// enhancers.push(applyMiddleware(...middleware));

const configureStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

// eslint-disable-next-line import/no-anonymous-default-export
export default { configureStore, history };
