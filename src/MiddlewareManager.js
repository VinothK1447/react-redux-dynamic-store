import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createReducer from './rootReducer';

const middleware = [thunk];
export const middlewarestore = createStore(createReducer(), compose(applyMiddleware(...middleware), ...(window.__REDUX_DEVTOOLS_EXTENSION__ ? [window.__REDUX_DEVTOOLS_EXTENSION__()] : [])));
