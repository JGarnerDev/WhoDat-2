import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";

import TextField from "@material-ui/core/TextField";

import { setView, updateUser, deleteUserById } from "../../store/actions";

class AccountSettings extends Component {
	state = {
		_id: this.props.user._id,
	};

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
				<form onSubmit={this.submitForm} data-test="accountSettings-form">
					<div>
						<h2>Change Username</h2>
						<TextField
							label="Username"
							variant="outlined"
							data-test="input-changeUsername"
							value={this.state.username}
							onChange={this.handleChangeFor("username")}
						/>
						<div data-test="username-error"></div>
					</div>
					<div>
						<h2>Change Email</h2>

						<TextField
							label="Email"
							variant="outlined"
							data-test="input-changeEmail"
							value={this.state.email}
							onChange={this.handleChangeFor("email")}
						/>
						<div data-test="email-error"></div>
					</div>
					<div>
						<h2>Change Password</h2>
						<TextField
							label="Password"
							variant="outlined"
							data-test="input-changePassword"
							value={this.state.password}
							onChange={this.handleChangeFor("password")}
						/>
						<TextField
							label="Confirm Password"
							variant="outlined"
							data-test="input-confirmChangePassword"
							value={this.state.confirmPassword}
							onChange={this.handleChangeFor("confirmPassword")}
						/>
						<div data-test="password-error"></div>
					</div>

					<button type="submit">Confirm</button>
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
