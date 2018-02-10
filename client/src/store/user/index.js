// CONSTANTS
const USER_SET = "CurrencyCourses/user/USER_SET";
const USER_UNSET = "CurrencyCourses/user/USER_UNSET";


// ACTION CREATORS
export const userSetAction = (user) => ({
	type: USER_SET,
	payload: user
});

export const userUnsetAction = () => ({
	type: USER_UNSET
});


// REDUCER
const initialState = {id: "", username: ""};
export const userReducer = (state = initialState, action = {}) => {
	const {type, payload} = action;
	switch (type) {
		case USER_SET:
			return payload || initialState;
		case USER_UNSET:
			return initialState;
		default:
			return state;
	}
};


// SELECTORS
export const userSelector = (state) => ({user: state.user});
