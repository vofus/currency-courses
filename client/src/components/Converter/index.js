import React, {Component} from "react";
import Select from "../Select";
import Button from "../Button";
import IconButton from "../IconButton";
import SwapIcon from "../Icons/SwapIcon";
import Input from "../Input";
import styles from "./converter.local.scss";
import _isNaN from "lodash/fp/isNaN";


export default class Converter extends Component {
	state = {
		from: "RUB",
		to: "USD",
		input: 0,
		output: 0
	};

	currensyList = [
		"AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "ISK",
		"JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"
	];

	swapCurrensy = () => {
		let {from, to} = this.state;
		[from, to] = [to, from];

		this.setState({from, to});
	};

	changeInput = (event) => this.setState({input: event.target.value});

	calculate = () => {
		let input = parseFloat(this.state.input);

		if (_isNaN(input)) {
			input = 0;
		}

		this.setState({
			input, output: input * 66
		});
	};


	selectCurrensy(field, item) {
		this.setState({
			[field]: item
		});
	}


	render() {
		return (
			<div className={styles["converter"]}>
				<div className={styles["converter__row"]}>
					<div className={styles["converter__column"]}>
						<span className={styles["converter__column-title"]}>From</span>
						<Select items={this.currensyList} value={this.state.from}
										onChange={this.selectCurrensy.bind(this, "from")}/>
						<div className={styles["converter__column-item-wrap"]}>
							<Input type="number" value={this.state.input} onChange={this.changeInput}/>
						</div>
					</div>
					<div className={styles["converter__column"]}>
						<IconButton title="Swap currensy" onAction={this.swapCurrensy}>
							<SwapIcon style={{fill: "#333333"}}/>
						</IconButton>
					</div>
					<div className={styles["converter__column"]}>
						<span className={styles["converter__column-title"]}>To</span>
						<Select items={this.currensyList} value={this.state.to} onChange={this.selectCurrensy.bind(this, "to")}/>
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
