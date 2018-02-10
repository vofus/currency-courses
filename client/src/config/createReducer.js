import {combineReducers} from "redux";

import {routerReducer} from "react-router-redux";
import {authReducer} from "../store/auth";
import {errorReducer} from "../store/error";
import {userReducer} from "../store/user";
import {configReducer} from "../store/config";
import {commonReducer} from "../store/common";

const createReducer = () =>
	combineReducers({
		auth: authReducer,
		router: routerReducer,
		error: errorReducer,
		user: userReducer,
		config: configReducer,
		common: commonReducer
	});

export default createReducer;