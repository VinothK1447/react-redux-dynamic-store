import { combineReducers } from 'redux';
import baseReducer from '../../basestore';

const createReducer = (asyncReducers) =>
	combineReducers({
		baseReducer,
		...asyncReducers,
	});

export default createReducer;
