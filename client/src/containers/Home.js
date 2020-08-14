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
			<div id="Home">
				<h1>Sup, you're logged in!</h1>

				<hr />
				<button onClick={() => this.props.reset()}>RESET THIS MOTHA</button>
			</div>
		) : (
			<div id="Home">
				<h1>Sup, you're not logged in!</h1>
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
