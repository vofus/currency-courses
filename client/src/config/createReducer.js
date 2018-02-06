import {combineReducers} from "redux";

import {routerReducer} from "react-router-redux";
import {authReducer} from "../store/auth";
import {errorReducer} from "../store/error";

const createReducer = () =>
	combineReducers({
		auth: authReducer,
		router: routerReducer,
		error: errorReducer
	});

export default createReducer;