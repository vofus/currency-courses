import React, {Fragment} from "react";
import PropTypes from "prop-types";
import styles from "./tabs.local.scss";

const renderTabItems = linkObjects => {
	return (
		<Fragment>
			{
				linkObjects.map((item, index) => {
					return (
						<li className={`${styles["tabs-item"]} ${index === 0 ? styles["active"] : ""}`} key={index}>
							<a href={item.link}>{item.title}</a>
						</li>
					);
				})
			}
		</Fragment>
	);
};

const Tabs = ({linkObjects}) => {
	return linkObjects.length > 0 ? (
		<ul className={styles["tabs"]}>
			{renderTabItems(linkObjects)}
		</ul>
	) : null;
};

Tabs.propTypes = {
	linkObjects: PropTypes.array
};

Tabs.defaultProps = {
	linkObjects: []
};

export default Tabs;
