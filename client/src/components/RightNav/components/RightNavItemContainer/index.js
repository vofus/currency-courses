import React from "react";
import styles from "./right-nav-item-container.local.scss";

const RightNavItemContainer = ({children, title}) => {
	return (
		<div className={styles["right-nav-item-container"]}>
			<span className={styles["right-nav-item-container__title"]}>{title}</span>
			{children}
		</div>
	);
};

export default RightNavItemContainer;