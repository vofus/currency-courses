import React, {Component} from "react";
import PropTypes from "prop-types";
import CurrensyCoursesItem from "../CurrensyCoursesItem";


import _map from "lodash/fp/map";
import _sortBy from "lodash/fp/sortBy";
import _filter from "lodash/fp/filter";

const renderCurrensy = currensy => {
	const sorted = [
		..._sortBy(["order", "name"])(_filter({isFavorite: true})(currensy)),
		..._sortBy(["order", "name"])(_filter({isFavorite: false})(currensy))
	];

	return _map(item => <CurrensyCoursesItem currensy={item} key={item.name}/>)(sorted);
};

export default class CurrensyCourses extends Component {
	static propTypes = {
		config: PropTypes.object
	};

	currensy = [
		{
			name: "RUB",
			rate: 1.22,
			isFavorite: true,
			order: 1
		},
		{
			name: "USD",
			rate: 12.22,
			isFavorite: false,
			order: 2
		},
		{
			name: "EUR",
			rate: 21.22,
			isFavorite: true,
			order: 3
		}
	];

	render() {
		console.log("CurrensyCourses", this.props);

		return (
			<div>
				{renderCurrensy(this.currensy)}
			</div>
		);
	}
}