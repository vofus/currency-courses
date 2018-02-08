import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import Input from "../Input";
import styles from "./auth-form.local.scss";


const AuthForm = ({username, password, setUsername, setPassword, login}) => {
	return (
		<div className={styles["auth-form"]}>
			<h2 className={styles["auth-form__title"]}>
				Wellcome to currensy courses
			</h2>

			<Input
				type="text"
				placeholder="Username"
				value={username}
				onChange={setUsername}
			/>
			<Input
				type="password"
				placeholder="Password"
				value={password}
				onChange={setPassword}
			/>
			<Button title="Login" onAction={login}/>
		</div>
	);
};

AuthForm.propTypes = {
	username: PropTypes.string,
	password: PropTypes.string,
	setUsername: PropTypes.func,
	setPassword: PropTypes.func,
	login: PropTypes.func
};

export default AuthForm;
