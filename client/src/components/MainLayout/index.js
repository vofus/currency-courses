import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Header from "../Header";
import RightNav from "../RightNav";
import Content from "../Content";
import styles from "./main-layout.local.scss";


const MainLayout = ({user, common, config, logout, closeRightNav, changeBaseCurrency}) => {
	return (
		<Fragment>
			<Header user={user} logout={logout}/>
			<div className={styles["main-layout__content"]}>
				<Content/>
				<RightNav title="Configurations"
									currencyList={common.currencyList}
									baseCurrency={config.baseCurrency}
									isOpen={common.rightNavIsOpen}
									close={closeRightNav}
									changeBaseCurrency={changeBaseCurrency}
				/>
			</div>
		</Fragment>
	);
};

MainLayout.propTypes = {
	user: PropTypes.object,
	common: PropTypes.object,
	config: PropTypes.object,
	logout: PropTypes.func,
	closeRightNav: PropTypes.func,
	changeBaseCurrency: PropTypes.func
};

export default MainLayout;