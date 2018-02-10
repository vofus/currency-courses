import React from "react";
import styles from "./right-nav-item.local.scss";

const RightNavItem = ({children, title}) => {
	return (
		<div className={styles["right-nav-item"]}>
			<span className={styles["right-nav-item__title"]}>{title}</span>
			{children}
		</div>
	);
};

export default RightNavItem;