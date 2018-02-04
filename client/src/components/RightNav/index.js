import React, {Component} from "react";
import PropTypes from "prop-types";
import styles from "./right-nav.local.scss";

import Select from "../Select";
import RightNavItemContainer from "./components/RightNavItemContainer";

class RightNav extends Component {
	static defaultProps = {
		title: "Menu"
	};

	state = {
		baseCurrensy: "RUB"
	};

	currensyList = [
		"AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "ISK",
		"JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"
	];

	testCallBack = item => {
		this.setState({
			baseCurrensy: item
		});
	};

	render() {
		return (
			<aside className={`${styles["right-nav"]} ${styles["right-nav--close"]}`}>
				<div className={styles["right-nav__header"]}>
					<button className={styles["right-nav__header-close-btn"]} title="Close menu"></button>
					<span className={styles["right-nav__header-title"]}>{this.props.title}</span>
				</div>
				<div className={styles["right-nav__content"]}>
					<RightNavItemContainer title="Base currensy">
						<Select items={this.currensyList} onChange={this.testCallBack} value={this.state.baseCurrensy}/>
					</RightNavItemContainer>
				</div>
			</aside>
		);
	}
}

RightNav.propTypes = {
	title: PropTypes.string
};

export default RightNav;