import React, {Component} from "react";
import styles from "./styles.local.scss";

export default class Header extends Component {
	constructor(props) {
		super(props);
		console.log("TEST: ", styles);
	}

	render() {
		return (
			<header className={styles.header}>
				<h2 className={styles.header__logo}>Currensy Courses</h2>
				<div className={styles.header__user}>
					<span>UserName</span>
					<button>Logout</button>
				</div>
			</header>
		);
	}
}