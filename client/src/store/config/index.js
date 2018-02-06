// CONSTANTS
const UPDATE_CONFIG = "CurrensyCourses/config/UPDATE_CONFIG";
const REMOVE_CONFIG = "CurrensyCourses/config/REMOVE_CONFIG";

// ACTION CREATORS
export const updateConfigAction = (config) => {
	return {
		type: UPDATE_CONFIG,
		payload: config
	};
};
export const removeConfigAction = () => ({type: REMOVE_CONFIG});


// REDUCER
const initialState = {id: "", userId: "", baseCurrensy: "", favorites: []};
export const configReducer = (state = initialState, action = {}) => {
	const {type, payload} = action;
	switch (type) {
		case UPDATE_CONFIG:
			return payload || initialState;
		case REMOVE_CONFIG:
			return initialState;
		default:
			return state;
	}
};

// SELECTORS
export const configSelector = (state) => ({config: state.config});
