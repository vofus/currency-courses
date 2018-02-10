// CONSTANTS
const CONFIG_SET = "CurrencyCourses/config/CONFIG_SET";
const CONFIG_UNSET = "CurrencyCourses/config/CONFIG_UNSET";

// ACTION CREATORS
export const configSetAction = (config) => {
	return {
		type: CONFIG_SET,
		payload: config
	};
};
export const configUnsetAction = () => ({type: CONFIG_UNSET});


// REDUCER
const initialState = {id: "", userId: "", baseCurrency: "", favorites: []};
export const configReducer = (state = initialState, action = {}) => {
	const {type, payload} = action;
	switch (type) {
		case CONFIG_SET:
			return payload ? {...state, ...payload} : initialState;
		case CONFIG_UNSET:
			return initialState;
		default:
			return state;
	}
};

// SELECTORS
export const configSelector = (state) => ({config: state.config});
