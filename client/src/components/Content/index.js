import React, {Component} from "react";
import PropTypes from "prop-types";
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import styles from "./content.local.scss";
import Tabs from "../Tabs";
import IconButton from "../IconButton";
import MenuIcon from "../Icons/MenuIcon";
import Converter from "../Converter";
import CurrencyCourses from "../CurrencyCourses";

import _filter from "lodash/fp/filter";

import {push} from "react-router-redux";
import {updateConfig} from "../../api";
import {locationSelector} from "../../store/router";
import {authSelector} from "../../store/auth";
import {configSelector, configSetAction} from "../../store/config";
import {commonSelector, commonSetAction} from "../../store/common";
import {asyncActionErrorShow} from "../../store/error";

const mapStateToProps = (state) => ({
	...locationSelector(state),
	...authSelector(state),
	...configSelector(state),
	...commonSelector(state)
});
const mapDispatchToProps = {
	configSetAction,
	commonSetAction,
	errorAction: asyncActionErrorShow,
	pushAction: push
};
const enhance = connect(mapStateToProps, mapDispatchToProps);

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
		location: PropTypes.object,
		auth: PropTypes.object,
		config: PropTypes.object,
		common: PropTypes.object,
		configSetAction: PropTypes.func,
		commonSetAction: PropTypes.func,
		errorAction: PropTypes.func,
		pushAction: PropTypes.func
	};


	/**
	 * Добавляем удаляем избраные валюты
	 * @param item
	 * @returns {Promise<void>}
	 */
	changeFavorites = async (item) => {
		const {name, isFavorite} = item;
		const {config: {favorites}, auth: {accessToken}, configSetAction, errorAction, pushAction} = this.props;

		try {
			let rawFavorites = [];

			if (isFavorite) {
				rawFavorites = _filter(($item) => $item.name !== name)(favorites);
			} else {
				rawFavorites = [...favorites, {name}];
			}

			const updatedConfig = await updateConfig({...this.props.config, favorites: rawFavorites}, accessToken);
			configSetAction(updatedConfig);
		} catch (e) {
			const message = e.message ? e.message : "Update favorite error";
			errorAction(message, e);

			if (e.code && e.code === 401) {
				pushAction("/login");
			}
		}
	};


	/**
	 * Открываем меню
	 */
	openMenu = () => {
		const {commonSetAction} = this.props;
		commonSetAction({rightNavIsOpen: true});
	};


	/**
	 * Render
	 * @returns {*}
	 */
	render() {
		const [courses, converter] = linkObjects.map(item => item.link);
		const {common: {rightNavIsOpen}} = this.props;

		return (
			<div className={`${styles.content} ${rightNavIsOpen ? styles.active : ""}`}>
				<Tabs linkObjects={linkObjects}/>

				<div className={`${styles["menu-button__wrapper"]} ${rightNavIsOpen ? styles.hidden : ""}`}>
					<IconButton title="Open menu" onAction={this.openMenu}>
						<MenuIcon style={{fill: "#333333"}}/>
					</IconButton>
				</div>

				<Switch>
					<Route exact
								 path={courses}
								 render={
									 () => <CurrencyCourses config={this.props.config}
																					common={this.props.common}
																					changeFavorites={this.changeFavorites}/>
								 }
					/>
					<Route path={converter}
								 render={
									 () => <Converter currencyList={this.props.common.currencyList}/>
								 }
					/>
				</Switch>
			</div>
		);
	}
}

export default enhance(Content);