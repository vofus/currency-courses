import React from "react";
import {Route, Switch} from "react-router-dom";
import styles from "./content.local.scss";

import Tabs from "../Tabs";
import Converter from "../Converter";
import CurrensyCourses from "../CurrensyCourses";


const linkObjects = [
	{
		link: "/courses",
		title: "Courses"
	},
	{
		link: "/courses/converter",
		title: "Converter"
	}
];


const Content = () => {
	const [courses, converter] = linkObjects.map(item => item.link);

	return (
		<div className={styles.content}>
			<Tabs linkObjects={linkObjects}/>
			<Switch>
				<Route exact path={courses} component={CurrensyCourses}/>
				<Route path={converter} component={Converter}/>
			</Switch>
		</div>
	);
};

export default Content;