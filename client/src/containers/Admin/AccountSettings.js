import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";

import TextField from "@material-ui/core/TextField";

import { setView, updateUser, deleteUserById } from "../../store/actions";

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
			<div id="Settings" data-test="container-accountSettings">
				<h1 data-test="accountSettings-header">Account Settings</h1>
				<div data-test="accountSettings-userInfo">
					<h3>Current info</h3>
					<h4>Username: {this.props.user.username}</h4>
					<h4>Email: {this.props.user.email}</h4>
				</div>
				<form data-test="accountSettings-form">
					<div>
						<h2>Change Username</h2>
						<TextField
							id="username"
							label="Username"
							variant="outlined"
							data-test="input-changeUsername"
						/>
					</div>
					<div>
						<h2>Change Email</h2>

						<TextField
							id="username"
							label="Email"
							variant="outlined"
							data-test="input-changeEmail"
						/>
					</div>
					<div>
						<h2>Change Password</h2>
						<TextField
							id="username"
							label="Password"
							variant="outlined"
							data-test="input-changePassword"
						/>
						<TextField
							id="username"
							label="Confirm Password"
							variant="outlined"
							data-test="input-confirmChangePassword"
						/>
					</div>
				</form>
			</div>
		) : (
			<Redirect to={{ pathname: "/" }} data-test="redirect-to-home" />
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ setView, updateUser, deleteUserById }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
