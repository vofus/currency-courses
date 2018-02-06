import {push} from "react-router-redux";
import {asyncActionErrorShow} from "../error";
import {userSetAction, userUnsetAction} from "../user";
import {updateConfigAction, removeConfigAction} from "../config";


// CONSTANTS
const AUTH_LOGIN = "currensyCourses/auth/AUTH_LOGIN";
const AUTH_LOGOUT = "currensyCourses/auth/AUTH_LOGOUT";


// ACTION CREATORS
export const authLoginAction = (userId, accessToken) => ({
	type: AUTH_LOGIN,
	payload: {userId, accessToken}
});
export const authLogoutAction = () => ({type: AUTH_LOGOUT});


// ASYNC ACTIONS
export const asyncActionAuthLogin = (username, password) => async (dispatch, getState, api) => {
	try {
		const {userId, accessToken} = await api.authUser(username, password);
		const user = await api.getUser(userId, accessToken);
		const config = await api.getConfig(accessToken);
		dispatch(authLoginAction(userId, accessToken));
		dispatch(userSetAction(user));
		dispatch(updateConfigAction(config));
		dispatch(push("/courses"));
	} catch (e) {
		const message = e.message ? e.message : "Username or password is incorrect";
		dispatch(asyncActionErrorShow(message, e));
	}
};

export const asyncActionAuthLogout = () => async (dispatch, getState, api) => {
	const {auth} = getState();

	if (!auth.accessToken) {
		return;
	}

	try {
		await api.logout(auth.accessToken);
		dispatch(authLogoutAction());
		dispatch(userUnsetAction());
		dispatch(push("/login"));
	} catch (e) {
		const message = e.message ? e.message : "Logout error";
		dispatch(asyncActionErrorShow(message, e));
	}
};


// REDUCER
const initialState = {userId: "", accessToken: ""};
export const authReducer = (state = initialState, action = {}) => {
	const {type, payload} = action;
	switch (type) {
		case AUTH_LOGIN:
			return payload || initialState;

		case AUTH_LOGOUT:
			return initialState;

		default:
			return state;
	}
};


// SELECTORS
export const authSelector = (state) => ({auth: state.auth});
