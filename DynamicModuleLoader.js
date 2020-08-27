import React from 'react';
import { ReactReduxContext } from 'react-redux';

const DynamicModuleLoader = (key, reducer, removeArray) => (WrappedComponent) => {
	return (props) => {
		return (
			<ReactReduxContext.Consumer>
				{({ store }) => {
					store.injectReducer(key, reducer);
					if (removeArray && Array.isArray(removeArray)) {
						removeArray.forEach((reducer) => {
							store.removeReducer(reducer);
						});
					}
					return <WrappedComponent {...props} reducerName={key} />;
				}}
			</ReactReduxContext.Consumer>
		);
	};
};

export { DynamicModuleLoader };
