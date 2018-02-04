import React from "react";
import PropTypes from "prop-types";
import styles from "./button.local.scss";
import _noop from "lodash/fp/noop";

const Button = ({title, disabled, onAction}) => {
	return (
		<div className={styles["button__wrapper"]}>
			<button disabled={disabled} onClick={onAction} title={title}>{title}</button>
		</div>
	);
};

Button.propTypes = {
	title: PropTypes.string,
	disabled: PropTypes.bool,
	onAction: PropTypes.func
};

Button.defaultProps = {
	title: "Click me",
	disabled: false,
	onAction: _noop
};

export default Button;