import React from "react";
import PropTypes from "prop-types";
import styles from "./icon-button.local.scss";
import _noop from "lodash/fp/noop";


const IconButton = ({title, style, onAction, children}) => {
	return (
		<button style={style} className={styles["icon-button"]} title={title} onClick={onAction}>
			{children}
		</button>
	);
};

IconButton.propTypes = {
	title: PropTypes.string,
	style: PropTypes.object,
	onAction: PropTypes.func
};

IconButton.defaultProps = {
	title: "Click me",
	style: null,
	onAction: _noop
};


export default IconButton;