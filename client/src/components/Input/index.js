import React from "react";
import PropTypes from "prop-types";
import styles from "./input.local.scss";

const Input = ({type, value, min, max, onChange, placeholder, autofocus}) => {
	return (
		<input
			className={styles["input"]}
			type={type}
			value={value}
			min={min}
			max={max}
			placeholder={placeholder}
			onChange={onChange}
			ref={ref => autofocus && ref && ref.focus()}
		/>
	);
};

Input.propTypes = {
	type: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onChange: PropTypes.func,
	autofocus: PropTypes.bool,
	min: PropTypes.number,
	max: PropTypes.number,
	placeholder: PropTypes.string
};

export default Input
