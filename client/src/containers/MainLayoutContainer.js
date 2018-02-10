import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import MainLayout from "../components/MainLayout";

import _keys from "lodash/fp/keys";
import _sortBy from "lodash/fp/sortBy";

import {getConfig, getRates, getUser, logout, updateConfig} from "../api";
import {getToken, removeToken} from "../localStorageUtils";
import {locationSelector} from "../store/router";
import {authLoginAction, authLogoutAction, authSelector} from "../store/auth";
import {userSelector, userSetAction, userUnsetAction} from "../store/user";
import {configSelector, configSetAction, configUnsetAction} from "../store/config";
import {commonSelector, commonSetAction, commonUnsetAction} from "../store/common";
import {asyncActionErrorShow} from "../store/error";


const mapStateToProps = (state) => ({
	...locationSelector(state),
	...authSelector(state),
	...userSelector(state),
	...configSelector(state),
	...commonSelector(state)
});

const mapDispatchToProps = {
	errorAction: asyncActionErrorShow,
	loginAction: authLoginAction,
	logoutAction: authLogoutAction,
	pushAction: push,
	userSetAction,
	userUnsetAction,
	configSetAction,
	configUnsetAction,
	commonSetAction,
	commonUnsetAction
};

const enhance = connect(mapStateToProps, mapDispatchToProps);


class MainLayoutContainer extends Component {
	static propTypes = {
		location: PropTypes.object,
		auth: PropTypes.object,
		user: PropTypes.object,
		config: PropTypes.object,
		common: PropTypes.object,
		errorAction: PropTypes.func,
		loginAction: PropTypes.func,
		logoutAction: PropTypes.func,
		pushAction: PropTypes.func,
		userSetAction: PropTypes.func,
		userUnsetAction: PropTypes.func,
		configSetAction: PropTypes.func,
		configUnsetAction: PropTypes.func,
		commonSetAction: PropTypes.func,
		commonUnsetAction: PropTypes.func
	};


	/**
	 * componentDidMount
	 */
	componentWillMount() {
		this.loadUserData();
	}


	/**
	 * Запрашиваем данные пользователя
	 */
	loadUserData = async () => {
		const {
			auth: {userId, accessToken},
			errorAction,
			loginAction,
			userSetAction,
			configSetAction,
			commonSetAction,
			pushAction
		} = this.props;

		try {
			let $userId = userId;
			let $accessToken = accessToken;
			const isExistToken = Boolean(userId) && Boolean(accessToken);

			if (!isExistToken) {
				const {userId, accessToken} = await getToken() || {};
				$userId = userId;
				$accessToken = accessToken;
			}

			if (!isExistToken && !Boolean($userId) && !Boolean($accessToken)) {
				return pushAction("/login");
			}

			const user = await getUser($userId, $accessToken);
			const config = await getConfig($accessToken);
			const rates = await getRates(config.baseCurrency);
			const currencyList = this.createCurrencyList(rates);

			loginAction($userId, $accessToken);
			userSetAction(user);
			configSetAction(config);
			commonSetAction({rates, currencyList});
		} catch (e) {
			const message = e.message ? e.message : "Load user data error";
			errorAction(message, e);

			if (e.code && e.code === 401) {
				pushAction("/login");
			}
		}
	};


	/**
	 * Создаем список
	 * @param ratesObj
	 */
	createCurrencyList = (ratesObj) => {
		const {base, rates} = ratesObj;
		const ratesKeys = _keys(rates);

		return _sortBy((item) => item)([...ratesKeys, base]);
	};


	/**
	 * Закрываем правое меню
	 */
	closeRightNav = () => {
		const {commonSetAction} = this.props;
		commonSetAction({rightNavIsOpen: false});
	};


	/**
	 * Изменяем базовую валюту
	 * @param currency
	 */
	changeBaseCurrency = async (currency) => {
		const {auth, config, configSetAction, commonSetAction, errorAction, pushAction} = this.props;

		try {
			const updatedConfig = await updateConfig({...config, baseCurrency: currency}, auth.accessToken);
			const rates = await getRates(currency);

			configSetAction(updatedConfig);
			commonSetAction({rates});
		} catch (e) {
			const message = e.message ? e.message : "Change base currency error";
			errorAction(message, e);

			if (e.code && e.code === 401) {
				pushAction("/login");
			}
		}
	};


	/**
	 * Logout
	 * @returns {Promise<void>}
	 */
	logout = async () => {
		const {
			auth: {accessToken},
			logoutAction,
			userUnsetAction,
			configUnsetAction,
			commonUnsetAction,
			pushAction,
			errorAction
		} = this.props;

		try {
			await logout(accessToken);
			await removeToken();
			logoutAction();
			userUnsetAction();
			configUnsetAction();
			commonUnsetAction();
			pushAction("/login");
		} catch (e) {
			const message = e.message ? e.message : "Logout error";
			errorAction(message, e);
		}
	};


	/**
	 * Render
	 * @returns {*}
	 */
	render() {
		return (
			<MainLayout user={this.props.user}
									config={this.props.config}
									common={this.props.common}
									logout={this.logout}
									closeRightNav={this.closeRightNav}
									changeBaseCurrency={this.changeBaseCurrency}
			/>
		);
	}
}


export default enhance(MainLayoutContainer);
