import React from "react";
import PropTypes from "prop-types";

const ArrowIcon = ({style}) => {
	return (
		<svg
			focusable="false"
			style={style}
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<path d="M7 10l5 5 5-5z"/>
		</svg>
	);
};

ArrowIcon.propTypes = {
	style: PropTypes.object
};

export default ArrowIcon;
