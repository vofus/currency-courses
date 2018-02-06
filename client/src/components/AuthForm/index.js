import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {asyncActionAuthLogin} from "../../store/auth";
import Button from "../Button";
import Input from "../Input";
import styles from "./auth-form.local.scss";

const enhance = connect(
	() => ({}),
	{login: asyncActionAuthLogin}
);

class AuthForm extends Component {
	static propTypes = {
		login: PropTypes.func,
		gotoTodos: PropTypes.func,
	};

	state = {
		username: "",
		password: "",
	};

	setUsername = (event) => this.setState({username: event.target.value});
	setPassword = (event) => this.setState({password: event.target.value});

	auth = async () => {
		const {username, password} = this.state;

		this.props.login(username, password);
	};

	render() {
		return (
			<div className={styles["auth-form"]}>
				<h2 className={styles["auth-form__title"]}>
					Wellcome to currensy courses
				</h2>

				<Input
					type="text"
					placeholder="Username"
					value={this.state.username}
					onChange={this.setUsername}
				/>
				<Input
					type="password"
					placeholder="Password"
					value={this.state.password}
					onChange={this.setPassword}
				/>
				<Button title="Login" onAction={this.auth}/>
			</div>
		)
	}
}

export default enhance(AuthForm);
