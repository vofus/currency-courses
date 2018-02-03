import React, {Component} from "react";
import "./styles.css";

import test from "./styles.css";

export default class Header extends Component {
	constructor(props) {
		super(props);
		console.log("TEST: ", test);
	}

	render() {
		return (
			<header className="header">
				<h2 className="header__logo">Currensy Courses</h2>
				<div className="">
					<span>UserName</span>
					<button>Logout</button>
				</div>
			</header>
		);
	}
}
