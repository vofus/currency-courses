import React, {Fragment} from "react";
import {Route, Redirect} from "react-router-dom";
import "typeface-roboto";
import "./styles.scss";
import AuthForm from "../AuthForm";

import Header from "../Header";
import Content from "../Content";
import RightNav from "../RightNav";

const renderMainLayout = () => {
	return (
		<Fragment>
			<Header/>
			<div className="app__content-wrapper">
				<Content/>
				<RightNav title="Right nav"/>
			</div>
		</Fragment>
	);
};

const App = () => {
	return (
		<div className="app">
			<Route exact path="/" render={() => <Redirect to="/courses"/>}/>
			<Route path="/courses" render={renderMainLayout}/>
			<Route path="/login" component={AuthForm}/>
		</div>
	);
};

export default App;
