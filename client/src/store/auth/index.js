// CONSTANTS
const AUTH_LOGIN = "CurrencyCourses/auth/AUTH_LOGIN";
const AUTH_LOGOUT = "CurrencyCourses/auth/AUTH_LOGOUT";


// ACTION CREATORS
export const authLoginAction = (userId, accessToken) => ({type: AUTH_LOGIN, payload: {userId, accessToken}});
export const authLogoutAction = () => ({type: AUTH_LOGOUT});


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
