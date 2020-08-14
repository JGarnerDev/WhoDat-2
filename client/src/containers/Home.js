import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reset, setView } from "../store/actions";

class Home extends Component {
	componentDidMount() {
		this.props.setView("home");
	}

	render() {
		return this.props.user.isAuth ? (
			<div id="Home">Sup homie </div>
		) : (
			<div id="Home">
				Sup, you at home
				<hr />
				<a href="/login">login</a>
				<hr />
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
	return bindActionCreators({ reset, setView }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
