import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import { setView, logUserIn, logUserOut } from "../../store/actions";

import Register from "./Register";

class Login extends Component {
	state = {
		email: "",
		password: "",
	};

	componentDidMount() {
		this.props.setView("login");
	}

	handleChangeFor = (propertyName) => (event) => {
		this.setState({ [propertyName]: event.target.value });
	};

	submitForm = (event) => {
		event.preventDefault();
		this.props.logUserIn(this.state);
	};

	// Make validation for form

	render() {
		return this.props.user.isAuth ? (
			<Redirect to={{ pathname: "/" }} />
		) : (
			<div id="Login">
				<form onSubmit={this.submitForm}>
					<h2>Login</h2>
					<input
						type="email"
						name="email"
						placeholder="Enter email"
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
					<button type="submit">Log in</button>
				</form>
				<hr />
				<hr />
				<Register />
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
	return bindActionCreators({ setView, logUserIn, logUserOut }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
