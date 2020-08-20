import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logUserOut } from "../../store/actions";

class Logout extends Component {
	componentDidMount() {
		this.props.logUserOut();
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
	return bindActionCreators({ logUserOut }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
