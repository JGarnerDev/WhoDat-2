import React, { Component } from "react";

import Greeting from "../components/Greeting";
import Login from "../containers/Admin/Login";
import CharacterList from "../components/Characters/CharacterList";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reset, setView } from "../store/actions";

class Home extends Component {
	componentDidMount() {
		this.props.setView("home");
	}

	render() {
		return (
			<div id="Home" data-test="container-home">
				<Greeting user={this.props.user} data-test="greeting" />
				{this.props.user.isAuth ? <CharacterList /> : <Login />}
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
