import React from "react";

const styles = {
	boxSizing: "border-box",
	display: "flex",
	alignItems: "center",
	width: "100%",
	height: "100%",
	padding: "0 12px",
	fontSize: "20px"
};

export default function Value({value}) {
	return <div style={styles}>{value}</div>;
}