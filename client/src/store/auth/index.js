import {push} from "react-router-redux";
import {asyncActionErrorShow} from "../error";
import {userSetAction, userUnsetAction} from "../user";
import {updateConfigAction, removeConfigAction} from "../config";


// CONSTANTS
const AUTH_LOGIN = "currensyCourses/auth/AUTH_LOGIN";
const AUTH_LOGOUT = "currensyCourses/auth/AUTH_LOGOUT";


// ACTION CREATORS
export const authLoginAction = (userId, accessToken) => ({type: AUTH_LOGIN, payload: {userId, accessToken}});
export const authLogoutAction = () => ({type: AUTH_LOGOUT});


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
