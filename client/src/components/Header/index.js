import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import UserAvatar from "../UserAvatar";
import Button from "../Button";
import styles from "./header.local.scss";

import {userSelector} from "../../store/user";
import {asyncActionAuthLogout} from "../../store/auth";

const mapStateToProps = userSelector;
const mapDispatchToProps = {logout: asyncActionAuthLogout};
const enhance = connect(mapStateToProps, mapDispatchToProps);

class Header extends Component {
	static propTypes = {
		user: PropTypes.object,
		logout: PropTypes.func
	};

	render() {
		return (
			<header className={styles.header}>
				<h2 className={styles.header__logo}>Currensy Courses</h2>
				<div className={styles.header__user}>
					<UserAvatar name={this.props.user.username}/>
					<Button title={"Logout"} onAction={this.props.logout}/>
				</div>
			</header>
		);
	}
}

export default enhance(Header);
