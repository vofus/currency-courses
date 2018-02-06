import React from "react";
import ReactDOM from "react-dom";
import {ConnectedRouter} from "react-router-redux";
import {Provider} from "react-redux";
import configStore, {history} from "./config/configStore";

import App from "./components/App";

const initialState = {};
const store = configStore(initialState);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App/>
		</ConnectedRouter>
	</Provider>,
	document.getElementById("root")
);
