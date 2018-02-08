import React, {Fragment} from "react";
import {Route, Redirect, Switch} from "react-router-dom";
import "typeface-roboto";
import "./styles.scss";
import AuthFormContainer from "../../containers/AuthFormContainer";
import MainLayout from "../MainLayout";

import Header from "../Header";
import Content from "../Content";
import RightNav from "../RightNav";
import Error from "../Error";

// const renderMainLayout = () => {
// 	return (
// 		<Fragment>
// 			<Header/>
// 			<div className="app__content-wrapper">
// 				<Content/>
// 				<RightNav title="Right nav"/>
// 			</div>
// 		</Fragment>
// 	);
// };

const App = () => {
	return (
		<div className="app">
			<Switch>
				<Route exact path="/" render={() => <Redirect to="/courses"/>}/>
				<Route path="/courses" component={MainLayout}/>
				<Route path="/login" component={AuthFormContainer}/>
				<Route render={() => <Redirect to="/"/>}/>
			</Switch>

			<Error/>
		</div>
	);
};

export default App;
