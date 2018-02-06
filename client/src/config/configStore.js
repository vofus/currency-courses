import {createStore, applyMiddleware, compose} from "redux";
import createBrowserHistory from "history/createBrowserHistory";
import {routerMiddleware as createRouterMiddleware} from "react-router-redux";
import createReducer from "./createReducer";
import thunk from "redux-thunk";

import * as api from "../api";

export const history = createBrowserHistory();

const routerMiddleware = createRouterMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () =>
	createStore(
		createReducer(),
		composeEnhancers(
			applyMiddleware(
				routerMiddleware,
				thunk.withExtraArgument(api)
			)
		)
	);

export default configureStore;