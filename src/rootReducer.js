import { combineReducers } from 'redux';
import baseReducer from './basereducer';

const createReducer = (asyncReducers) =>
	combineReducers({
		baseReducer,
		...asyncReducers,
	});

export default createReducer;
