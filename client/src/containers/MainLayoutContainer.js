import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import MainLayout from "../components/MainLayout";


import {authUser} from "../api";
import {saveToken} from "../localStorageUtils";
import {authLoginAction, authSelector} from "../store/auth";
import {asyncActionErrorShow} from "../store/error";


const mapStateToProps = (state) => ({
	...authSelector(state)
});

const mapDispatchToProps = {
	errorAction: asyncActionErrorShow,
	pushAction: push
};

const enhance = connect(mapStateToProps, mapDispatchToProps);


class MainLayoutContainer extends Component {

}


export default enhance(MainLayoutContainer);
