import React from "react";
import PropTypes from "prop-types";
import CurrencyCoursesItem from "../CurrencyCoursesItem";


import _map from "lodash/fp/map";
import _sortBy from "lodash/fp/sortBy";
import _filter from "lodash/fp/filter";
import _includes from "lodash/fp/includes";
import _isEmpty from "lodash/fp/isEmpty";


const renderCurrency = (config, common, changeFavorites) => {
	const {baseCurrency, favorites} = config;
	const {currencyList, rates: {rates}} = common;

	if (_isEmpty(baseCurrency) || _isEmpty(currencyList) || _isEmpty(rates)) {
		return null;
	}

	const favoriteNames = _map("name")(favorites);
	const currency = _map((cur) => {
		return {
			name: cur,
			value: cur !== baseCurrency ? rates[cur] : "Base currency",
			isFavorite: _includes(cur)(favoriteNames)
		};
	})(currencyList);

	const sorted = [
		..._sortBy(["name"])(_filter({isFavorite: true})(currency)),
		..._sortBy(["name"])(_filter({isFavorite: false})(currency))
	];

	return (
		<div>
			{_map(item => <CurrencyCoursesItem currency={item} key={item.name} changeFavorites={changeFavorites}/>)(sorted)}
		</div>
	);
};


const CurrencyCourses = ({config, common, changeFavorites}) => renderCurrency(config, common, changeFavorites);

CurrencyCourses.propTypes = {
	config: PropTypes.object,
	common: PropTypes.object,
	changeFavorites: PropTypes.func
};

export default CurrencyCourses;
