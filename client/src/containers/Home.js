import React, { Component } from "react";

import Greeting from "../components/Greeting";
import Login from "../containers/Admin/Login";
import CharacterList from "../components/CharacterData/CharacterList";
import SnackbarNotification from "../components/SnackbarNotification";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reset, setView, welcomeNotify, goodbyeNotify } from "../store/actions";

class Home extends Component {
	state = {};
	componentDidMount() {
		this.props.setView("home");
		if (this.props.user.isAuth) {
			this.props.welcomeNotify();
		}
		if (this.props.user.logout) {
			this.props.goodbyeNotify();
		}
	}

	render() {
		return (
			<div id="Home" data-test="container-home">
				<Greeting user={this.props.user} data-test="greeting" />
				{this.props.user.isAuth ? <CharacterList /> : <Login />}
				{this.props.user.notifications.welcome === 0 &&
				this.props.user.isAuth ? (
					<SnackbarNotification message={this.props.user.message} />
				) : null}
				{this.props.user.notifications.goodbye === 1 ? (
					<SnackbarNotification message={"Logout successful! See ya!"} />
				) : null}
				<button onClick={() => this.props.reset()}>RESET THIS MOTHA</button>
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
	return bindActionCreators(
		{ reset, setView, welcomeNotify, goodbyeNotify },
		dispatch
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
