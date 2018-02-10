// CONSTANTS
const COMMON_SET = "CurrencyCourses/config/COMMON_SET";
const COMMON_UNSET = "CurrencyCourses/config/COMMON_UNSET";

// ACTION CREATORS
export const commonSetAction = (common) => {
	return {
		type: COMMON_SET,
		payload: common
	};
};
export const commonUnsetAction = () => ({type: COMMON_UNSET});


// REDUCER
const initialState = {rightNavIsOpen: true, currencyList: [], rates: {}};
export const commonReducer = (state = initialState, action = {}) => {
	const {type, payload} = action;
	switch (type) {
		case COMMON_SET:
			return payload ? {...state, ...payload} : initialState;
		case COMMON_UNSET:
			return initialState;
		default:
			return state;
	}
};

// SELECTORS
export const commonSelector = (state) => ({common: state.common});
