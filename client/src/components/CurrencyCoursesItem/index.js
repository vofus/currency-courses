import React from "react";
import IconButton from "../IconButton";
import StarIcon from "../Icons/StarIcon";
import styles from "./currency-courses-item.local.scss";

const getClassName = isActive => {
	return [
		styles["currency-courses-item__star-wrapper"],
		`${isActive ? styles.active : ""}`
	].join(" ");
};

const CurrencyCoursesItem = ({currency, changeFavorites}) => {
	return (
		<div className={styles["currency-courses-item"]}>
			<div className={getClassName(currency.isFavorite)}>
				<IconButton title={currency.isFavorite ? "Remove from favorites" : "Add to favorites"}
										onAction={() => changeFavorites(currency)}>
					<StarIcon style={{fill: "#FF9800"}}/>
				</IconButton>
			</div>

			<span className={styles["currency-courses-item__name"]}>{currency.name}</span>
			<span className={styles["currency-courses-item__rate"]}>{currency.value}</span>
		</div>
	);
};

export default CurrencyCoursesItem;
