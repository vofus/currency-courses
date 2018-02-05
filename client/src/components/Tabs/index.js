import React, {Fragment} from "react";
import PropTypes from "prop-types";
import styles from "./tabs.local.scss";
import {NavLink} from "react-router-dom";

const renderTabItems = linkObjects => {
	return (
		<Fragment>
			{
				linkObjects.map((item, index) => {
					return (
						<li className={styles["tabs-item"]} key={index}>
							<NavLink exact to={item.link} activeClassName={styles.active}>{item.title}</NavLink>
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
