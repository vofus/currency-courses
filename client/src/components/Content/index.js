import React, {Component} from "react";
import PropTypes from "prop-types";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {configSelector} from "../../store/config";
import styles from "./content.local.scss";
import Tabs from "../Tabs";
import Converter from "../Converter";
import CurrensyCourses from "../CurrensyCourses";


const mapStateToProps = (state) => ({
	...configSelector(state)
});
const enhance = connect(mapStateToProps);

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


class Content extends Component {
	static propTypes = {
		config: PropTypes.object
	};

	render() {
		const [courses, converter] = linkObjects.map(item => item.link);

		return (
			<div className={styles.content}>
				<Tabs linkObjects={linkObjects}/>
				<Switch>
					<Route exact path={courses} render={() => <CurrensyCourses config={this.props.config}/>}/>
					<Route path={converter} render={() => <Converter config={this.props.config}/>}/>
				</Switch>
			</div>
		);
	}
}

export default enhance(Content);