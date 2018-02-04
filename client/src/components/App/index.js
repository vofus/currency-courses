import React from "react";
import "typeface-roboto";
import "./styles.scss";
import AuthForm from "../AuthForm";

const App = () => {
	return (
		<div className="app">
			{/*<Header/>*/}
			{/*<div className="app__content-wrapper">*/}
			{/*<Content/>*/}
			{/*<RightNav title={"Right nav"} />*/}
			{/*</div>*/}
			<AuthForm/>
		</div>
	);
};

export default App;
