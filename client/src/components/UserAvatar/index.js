import React from "react";
import PropTypes from "prop-types";
import styles from "./user-avatar.local.scss";

const UserAvatar = ({name, src}) => {
	return (
		<div className={styles["user-avatar"]}>
			<div className={styles["user-avatar__img-wrapper"]}>
				{src ? <img src={src} alt={name}/> : null}
			</div>
			<div className={styles["user-avatar__name-wrapper"]}>
				<span>{name}</span>
			</div>
		</div>
	);
};

UserAvatar.propTypes = {
	name: PropTypes.string,
	src: PropTypes.string
};

UserAvatar.defaultProps = {
	name: "Guest"
};

export default UserAvatar;