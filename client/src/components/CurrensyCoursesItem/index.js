import React from "react";
import IconButton from "../IconButton";
import StarIcon from "../Icons/StarIcon";
import styles from "./currensy-courses-item.local.scss";

const getClassName = isActive => {
	return [
		styles["currensy-courses-item__star-wrapper"],
		`${isActive ? styles.active : ""}`
	].join(" ");
};

const CurrensyCoursesItem = ({currensy}) => {
	return (
		<div className={styles["currensy-courses-item"]}>
			<div className={getClassName(currensy.isFavorite)}>
				<IconButton title={currensy.isFavorite ? "Remove from favorites" : "Add to favorites"}>
					<StarIcon style={{fill: "#FF9800"}}/>
				</IconButton>
			</div>

			<span className={styles["currensy-courses-item__name"]}>{currensy.name}</span>
			<span className={styles["currensy-courses-item__rate"]}>{currensy.rate}</span>
		</div>
	);
};

export default CurrensyCoursesItem;
