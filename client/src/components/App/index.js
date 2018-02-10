import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import "typeface-roboto";
import "./styles.scss";
import AuthFormContainer from "../../containers/AuthFormContainer";
import MainLayoutContainer from "../../containers/MainLayoutContainer";
import Error from "../Error";

const App = () => {
	return (
		<div className="app">
			<Switch>
				<Route exact path="/" render={() => <Redirect to="/courses"/>}/>
				<Route path="/login" component={AuthFormContainer}/>
				<Route path="/courses" component={MainLayoutContainer}/>
				<Route render={() => <Redirect to="/"/>}/>
			</Switch>

			<Error/>
		</div>
	);
};

export default App;
