import React from "react";
import PropTypes from "prop-types";
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";

import {authSelector} from '../store/auth'
import {locationSelector} from '../store/router'

const mapStateToProps = (state) => ({
	...authSelector(state),
	...locationSelector(state),
});
const enhance = connect(mapStateToProps);

const ProtectedRoute = ({auth = {}, component: Component, ...restProps}) => {
	return (
		<Route
			{...restProps}
			render={props =>
				Boolean(auth.accessToken) ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: {from: props.location}
						}}
					/>
				)
			}
		/>
	);
};

ProtectedRoute.propTypes = {
	auth: PropTypes.object,
	path: PropTypes.string,
	exact: PropTypes.bool,
	render: PropTypes.func,
	component: PropTypes.func
};

export default enhance(ProtectedRoute);