import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { logUserIn } from "../../store/actions";

class Register extends Component {
	state = {
		email: "",
		password: "",
	};

	handleChangeFor = (propertyName) => (event) => {
		this.setState({ [propertyName]: event.target.value });
	};

	submitForm = (event) => {
		event.preventDefault();

		this.props.logUserIn({
			email: this.state.email,
			password: this.state.password,
		});
	};

	render() {
		return (
			<div id="Register">
				<form onSubmit={this.submitForm}>
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
	return bindActionCreators({ logUserIn }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
