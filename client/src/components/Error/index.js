import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import styles from "./error.local.scss";

const enhance = connect(({error}) => ({error}));

class Error extends Component {
	static propTypes = {
		error: PropTypes.shape({
			message: PropTypes.string,
			show: PropTypes.bool
		})
	};

	render() {
		const {error} = this.props;

		if (error && error.show) {
			return <div className={styles.error}>{error.message}</div>;
		}

		return null;
	}
}

export default enhance(Error);