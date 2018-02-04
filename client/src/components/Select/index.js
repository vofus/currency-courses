import React, {Component, Fragment} from "react";
import _noop from "lodash/fp/noop";

import IconComponent from "../Icons/ArrowIcon";
import ItemComponent from "./components/Item";
import ValueComponent from "./components/Value";
import styles from "./select.local.scss";

class Select extends Component {
	static defaultProps = {
		items: [],
		onChange: _noop,
		value: "Choose item..."
	};

	state = {
		itemContainerBox: {},
		opened: false
	};

	componentDidMount() {
		window.addEventListener("scroll", this.setItemsConteinerBox);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.setItemsConteinerBox);
	}

	getItemsContainerBox = () => {
		if (!this.rootElement || !this.itemsContainerElement) {
			return;
		}

		const rootElementBoundery = this.rootElement.getBoundingClientRect();
		const left = rootElementBoundery.left;
		const bottom = rootElementBoundery.top + this.itemsContainerElement.offsetHeight;
		const top = bottom > window.innerHeight
			? rootElementBoundery.bottom - this.itemsContainerElement.offsetHeight
			: rootElementBoundery.top;

		return {
			width: `${this.rootElement.offsetWidth}px`,
			left: `${left}px`,
			top: `${top}px`
		};
	};

	setItemsConteinerBox = () => {
		const itemContainerBox = this.getItemsContainerBox();
		this.setState({
			itemContainerBox,
		});
	};

	closeItemsContainer = () => {
		this.setState({
			opened: false
		});
	};

	openItemsContainer = () => {
		this.setState(
			() => ({
				opened: true
			}),
			this.setItemsConteinerBox
		);
	};

	onItemChose = item => () => {
		this.props.onChange(item);
	};

	isActive = item => {
		return item === this.props.value;
	};

	renderItemsContainer = () => {
		return (
			<div className={styles["select-items-container-wrapper"]} onClick={this.closeItemsContainer}>
				<div
					className={styles["select-items-container"]}
					ref={itemsContainer => {
						this.itemsContainerElement = itemsContainer;
					}}
					style={this.state.itemContainerBox}
				>
					<ul className={styles["select-items-list"]}>
						{this.props.items.map((item, index) => (
							<li className={`${styles["select-list-item"]} ${this.isActive(item) ? styles["active"] : ""}`}
									key={index}
									onClick={this.onItemChose(item)}
							>
								<ItemComponent value={item}/>
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	};

	render() {
		const {style, value} = this.props;
		const {opened} = this.state;

		return (
			<Fragment>
				<div
					className={styles["select-root"]}
					style={style}
					ref={root => {
						this.rootElement = root;
					}}
				>
					<div className={styles["select-value"]} onClick={this.openItemsContainer}>
						<ValueComponent value={value}/>
					</div>
					<button
						className={styles["select-arrow-button"]}
						onClick={this.openItemsContainer}
					>
						<IconComponent style={{width: "27px", height: "27px"}}/>
					</button>
				</div>
				{opened && this.renderItemsContainer()}
			</Fragment>
		);
	}
}

export default Select;