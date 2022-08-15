import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';

import { routerReducer } from 'react-router-redux';
import reducers from 'redux/reducers/reducers';

import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
let middleware = applyMiddleware(logger, thunkMiddleware);

const store = createStore(
    combineReducers({
            routing: routerReducer,
            app: reducers
    }),
    middleware
);

export default store;