import React, {Component} from "react";
import UserAvatar from "../UserAvatar";
import Button from "../Button";
import styles from "./header.local.scss";

export default class Header extends Component {
	render() {
		return (
			<header className={styles.header}>
				<h2 className={styles.header__logo}>Currensy Courses</h2>
				<div className={styles.header__user}>
					<UserAvatar name={"Vofus"}/>
					<Button title={"Logout"}/>
				</div>
			</header>
		);
	}
}
