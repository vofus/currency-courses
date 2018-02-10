import React from "react";
import PropTypes from "prop-types";
import styles from "./right-nav.local.scss";

import _noop from "lodash/fp/noop";

import Select from "../Select";
import IconButton from "../IconButton";
import CloseIcon from "../Icons/CloseIcon";
import RightNavItemContainer from "./components/RightNavItem";


const RightNav = ({isOpen, title, currencyList, baseCurrency, changeBaseCurrency, close}) => {
	return (
		<aside className={`${styles["right-nav"]} ${!isOpen ? styles["right-nav--close"] : ""}`}>
			<div className={styles["right-nav__header"]}>
				<IconButton title="Close menu" onAction={close}>
					<CloseIcon style={{fill: "#333333"}}/>
				</IconButton>
				<span className={styles["right-nav__header-title"]}>{title}</span>
			</div>
			<div className={styles["right-nav__content"]}>
				<RightNavItemContainer title="Base currency">
					<Select items={currencyList} onChange={changeBaseCurrency} value={baseCurrency}/>
				</RightNavItemContainer>
			</div>
		</aside>
	);
};

RightNav.propTypes = {
	isOpen: PropTypes.bool,
	title: PropTypes.string,
	currencyList: PropTypes.arrayOf(PropTypes.string),
	baseCurrency: PropTypes.string,
	changeBaseCurrency: PropTypes.func,
	close: PropTypes.func
};

RightNav.defaultProps = {
	isOpen: true,
	title: "Menu",
	currencyList: [],
	baseCurrency: "Currency",
	changeBaseCurrency: _noop,
	close: _noop
};


export default RightNav;