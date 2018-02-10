const DELAY = 4000;
const delay = (delayTime) => new Promise(resolve => setTimeout(resolve, delayTime));


const ERROR_SHOW = "CurrencyCourses/error/ERROR_SHOW";
const ERROR_HIDE = "CurrencyCourses/error/ERROR_HIDE";

const actionErrorShow = (message) => ({type: ERROR_SHOW, payload: message});
const actionErrorHide = () => ({type: ERROR_HIDE});


/**
 * asyncActionErrorShow
 * @param message
 * @param error
 * @param delayTime
 * @returns {function(*)}
 */
export const asyncActionErrorShow = (message, error, delayTime = DELAY) => async (dispatch) => {
	console.error(error);
	dispatch(actionErrorShow(message));
	await delay(delayTime);
	dispatch(actionErrorHide());
};


const initialState = {
	message: "",
	show: false
};


/**
 * Error reducer
 * @param state
 * @param action
 * @returns {*}
 */
export const errorReducer = (state = initialState, action = {}) => {
	const {type, payload} = action;
	switch (type) {
		case ERROR_SHOW:
			return {message: payload, show: true};

		case ERROR_HIDE:
			return initialState;

		default:
			return initialState;
	}
};
