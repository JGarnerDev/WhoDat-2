import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { registerUser } from "../../store/actions";

class Register extends Component {
	state = {
		username: "",
		name: "",
		lastname: "",
		email: "",
		password: "",
		confirmPassword: "",
		error: "",
	};

	handleChangeFor = (propertyName) => (event) => {
		this.setState({ [propertyName]: event.target.value });
	};

	submitForm = (event) => {
		event.preventDefault();

		this.props.registerUser({
			username: this.state.username,
			lastname: this.state.lastname,
			email: this.state.email,
			password: this.state.password,
		});
	};

	render() {
		return (
			<div id="Register">
				<form onSubmit={this.submitForm}>
					<input
						type="text"
						name="name"
						placeholder="Username"
						value={this.state.username}
						onChange={this.handleChangeFor("username")}
					/>
					<input
						type="email"
						name="email"
						placeholder="email"
						value={this.state.email}
						onChange={this.handleChangeFor("email")}
					/>
					<input
						type="password"
						name="password"
						placeholder="Enter password"
						value={this.state.password}
						onChange={this.handleChangeFor("password")}
					/>
					<input
						type="password"
						name="confirmPassword"
						placeholder="Confirm password"
						value={this.state.confirmPassword}
						onChange={this.handleChangeFor("confirmPassword")}
					/>
					<button type="submit">Register</button>
				</form>
				<div>{this.props.user.message}</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ registerUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
