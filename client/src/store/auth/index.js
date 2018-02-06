import {push} from "react-router-redux";
import {asyncActionErrorShow} from "../error";


// CONSTANTS
const AUTH_LOGIN = "currensyCourses/auth/AUTH_LOGIN";
const AUTH_LOGOUT = "currensyCourses/auth/AUTH_LOGOUT";


// ACTION CREATORS
export const authLoginAction = (id, token) => ({
	type: AUTH_LOGIN,
	payload: {id, token}
});
export const authLogoutAction = () => ({type: AUTH_LOGOUT});


// ASYNC ACTIONS
export const asyncActionAuthLogin = (username, password) => async (dispatch, getState, api) => {
	try {
		const {id, token, title} = await api.authUser(username, password);
		// dispatch(authLoginAction(id, token));
		// dispatch(userSetAction(id, title));
		dispatch(push("/courses"));
	} catch (e) {
		dispatch(asyncActionErrorShow("Username or password is incorrect", e));
	}
};


// REDUCER
const initialState = {id: "", token: ""};
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
