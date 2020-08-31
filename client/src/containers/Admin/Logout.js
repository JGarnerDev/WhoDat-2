import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logUserOut, reset } from "../../store/actions";

class Logout extends Component {
	componentDidMount() {
		this.props.logUserOut();
		setTimeout(() => {
			this.props.reset();
		}, 1000);
	}

	render() {
		return <Redirect to="/" />;
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ logUserOut, reset }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
