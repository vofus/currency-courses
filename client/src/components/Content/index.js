import React from "react";
import styles from "./content.local.scss";

import Tabs from "../Tabs";
import Converter from "../Converter";


const linkObjects = [
	{
		link: "/",
		title: "Home"
	},
	{
		link: "/converter",
		title: "Converter"
	}
];


const Content = () => <div className={styles.content}>
	<Tabs linkObjects={linkObjects}/>
	{/*<CurrensyCourses/>*/}
	<Converter/>
</div>;

export default Content;