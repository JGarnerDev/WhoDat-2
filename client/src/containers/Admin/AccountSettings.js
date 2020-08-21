import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";

import { updateUser, deleteUserById } from "../../store/actions";

class AccountSettings extends Component {
	state = {};

	componentDidMount() {
		this.props.setView("settings");
	}

	handleChangeFor = (propertyName) => (event) => {
		this.setState({ [propertyName]: event.target.value });
	};

	submitForm = (event) => {
		event.preventDefault();
		this.props.updateUser(this.state);
	};

	render() {
		return this.props.user.isAuth ? (
			<Redirect to={{ pathname: "/" }} />
		) : (
			<div id="Settings"></div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
