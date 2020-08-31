import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import SnackbarNotification from "../../components/SnackbarNotification";

import { logUserIn } from "../../store/actions";

class Register extends Component {
	state = {
		username: "",
		password: "",
		isSubmitted: false,
	};

	handleChangeFor = (propertyName) => (event) => {
		this.setState({ [propertyName]: event.target.value });
	};

	submitForm = (event) => {
		event.preventDefault();

		this.props.logUserIn({
			username: this.state.username,
			password: this.state.password,
		});
		setTimeout(() => {
			this.setState({ isSubmitted: true });
		}, 200);

		setTimeout(() => {
			this.setState({ isSubmitted: false });
			this.props.user.message = "";
		}, 2000);
	};

	render() {
		return (
			<div id="Register">
				<form onSubmit={this.submitForm}>
					<input
						type="text"
						name="username"
						placeholder="Enter username"
						value={this.state.username}
						onChange={this.handleChangeFor("username")}
					/>
					<input
						type="password"
						name="password"
						placeholder="Enter password"
						value={this.state.password}
						onChange={this.handleChangeFor("password")}
					/>
					<button type="submit">Log in</button>
					{this.props.user.message && this.state.isSubmitted ? (
						<SnackbarNotification message={this.props.user.message} />
					) : null}
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
