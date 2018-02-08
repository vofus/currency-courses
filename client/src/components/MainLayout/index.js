import React, {Fragment} from "react";
import Header from "../Header";
import RightNav from "../RightNav";
import Content from "../Content";
import styles from "./main-layout.local.scss";


const MainLayout = () => {
	return (
		<Fragment>
			<Header/>
			<div className={styles["main-layout__content"]}>
				<Content/>
				<RightNav title="Right nav"/>
			</div>
		</Fragment>
	);
};

export default MainLayout;