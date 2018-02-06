import {combineReducers} from "redux";

import {routerReducer} from "react-router-redux";
import {authReducer} from "../store/auth";
import {errorReducer} from "../store/error";
import {userReducer} from "../store/user";
import {configReducer} from "../store/config";

const createReducer = () =>
	combineReducers({
		auth: authReducer,
		router: routerReducer,
		error: errorReducer,
		user: userReducer,
		config: configReducer
	});

export default createReducer;