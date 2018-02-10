import React, {Component} from "react";
import PropTypes from "prop-types";
import Select from "../Select";
import Button from "../Button";
import IconButton from "../IconButton";
import SwapIcon from "../Icons/SwapIcon";
import Input from "../Input";
import styles from "./converter.local.scss";
import _isNaN from "lodash/fp/isNaN";

import {convert} from "../../api";


export default class Converter extends Component {
	static propTypes = {
		currencyList: PropTypes.arrayOf(PropTypes.string)
	};

	state = {
		from: "USD",
		to: "RUB",
		input: 0,
		output: 0
	};


	/**
	 * Меняем местами конвертируемые валюты
	 */
	swapCurrency = () => {
		let {from, to, input, output} = this.state;
		[from, to] = [to, from];
		[input, output] = [output, input];

		this.setState({from, to, input, output});
	};


	/**
	 * Сохраняем значение ввода в стэйте
	 * @param event
	 * @returns {*}
	 */
	changeInput = (event) => this.setState({input: event.target.value});


	/**
	 * Считаем
	 */
	calculate = async () => {
		const {from, to, input} = this.state;
		let $input = parseFloat(input);

		if (_isNaN($input)) {
			$input = 0;
		}

		try {
			const rate = await convert(from, to);

			this.setState({
				input: $input,
				output: $input * rate
			});
		} catch (e) {
			console.error(e);
			this.setState({
				input: 0,
				output: 0
			});
		}
	};


	/**
	 * Выбираем валюту для конвертации
	 * @param field
	 * @param item
	 */
	selectCurrency(field, item) {
		this.setState({
			[field]: item
		});
	}


	/**
	 * Render
	 * @returns {*}
	 */
	render() {
		return (
			<div className={styles["converter"]}>
				<div className={styles["converter__row"]}>
					<div className={styles["converter__column"]}>
						<span className={styles["converter__column-title"]}>From</span>
						<Select items={this.props.currencyList}
										value={this.state.from}
										onChange={this.selectCurrency.bind(this, "from")}/>
						<div className={styles["converter__column-item-wrap"]}>
							<Input type="number" value={this.state.input} onChange={this.changeInput}/>
						</div>
					</div>
					<div className={styles["converter__column"]}>
						<IconButton title="Swap currency" onAction={this.swapCurrency}>
							<SwapIcon style={{fill: "#333333"}}/>
						</IconButton>
					</div>
					<div className={styles["converter__column"]}>
						<span className={styles["converter__column-title"]}>To</span>
						<Select items={this.props.currencyList}
										value={this.state.to}
										onChange={this.selectCurrency.bind(this, "to")}/>
						<div className={styles["converter__column-item-wrap"]}>
							<span className={styles["converter__result"]}>{this.state.output}</span>
						</div>
					</div>
				</div>
				<div className={styles["converter__row"]}>
					<Button title="Convert" onAction={this.calculate}/>
				</div>
			</div>
		);
	}
}
