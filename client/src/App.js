import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./routes";

import Nav from "./containers/Nav";

class App extends Component {
	render() {
		return (
			<div id="App">
				<Router>
					<Nav />
					<Routes user={this.props.user} />
				</Router>
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
	return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
