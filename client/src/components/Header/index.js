import React from "react";
import PropTypes from "prop-types";
import UserAvatar from "../UserAvatar";
import Button from "../Button";
import styles from "./header.local.scss";
import _noop from "lodash/fp/noop";


const Header = ({user, logout}) => {
	return (
		<header className={styles.header}>
			<h2 className={styles.header__logo}>Currency Courses</h2>
			<div className={styles.header__user}>
				<UserAvatar name={user.username}/>
				<Button title="Logout" onAction={logout}/>
			</div>
		</header>
	);
};

Header.propTypes = {
	user: PropTypes.object,
	logout: PropTypes.func
};

Header.defaultProps = {
	user: {},
	logout: _noop
};

export default Header;
