import { createStore, compose } from 'redux';
import createReducer from './rootReducer';
import { middlewarestore } from './MiddlewareManager';

const REDUCER_ADDED = '@@dynamic-store/REDUCER_ADDED';
const REDUCER_REMOVED = '@@dynamic-store/REDUCER_REMOVED';

const initializeStore = (options) => {
	let store;
	if (options) {
		const { middleware } = options;
		if (middleware && middleware === 'thunk') {
			store = middlewarestore;
		}
	} else {
		store = createStore(createReducer(), compose(...(window.__REDUX_DEVTOOLS_EXTENSION__ ? [window.__REDUX_DEVTOOLS_EXTENSION__()] : [])));
	}

	store.asyncReducers = {};
	store.injectReducer = (key, reducer) => {
		if (!store.asyncReducers.hasOwnProperty(key)) {
			store.asyncReducers[key] = reducer;
			store.replaceReducer(createReducer(store.asyncReducers));
			store.dispatch({ type: REDUCER_ADDED, payload: key });
		}
	};

	store.removeReducer = (key) => {
		if (store.asyncReducers.hasOwnProperty(key)) {
			delete store.asyncReducers[key];
			store.dispatch({ type: `${REDUCER_REMOVED}/${key}`, payload: key });
		}
		store.replaceReducer(createReducer(store.asyncReducers));
	};
	return store;
};
export default initializeStore;
