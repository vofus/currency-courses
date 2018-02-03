import React from "react";
import ReactDOM from "react-dom";
import createBrowserHistory from "history/createBrowserHistory";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";

import App from "./components/App";

const reducer = state => state;
const initialState = {};

const store = createStore(reducer, initialState);
const customHistory = createBrowserHistory();

ReactDOM.render(
	<Provider store={store}>
		<Router history={customHistory}>
			<App/>
		</Router>
	</Provider>,
	document.getElementById("root")
);
