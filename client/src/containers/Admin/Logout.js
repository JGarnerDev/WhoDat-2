import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logUserOut } from "../../store/actions";

class Logout extends Component {
	logout = () => {
		this.props.logUserOut();
	};

	render() {
		// return this.props.user.login === "Goodbye!" ? (
		// 	<Redirect to={{ pathname: "/" }} />
		// ) :

		return (
			<div id="Logout">
				<button
					onClick={() => {
						this.logout();
					}}
				>
					Log out
				</button>
				<h1>{this.props.user.goodbye ? "" : "Goodbye!"}</h1>
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
	return bindActionCreators({ logUserOut }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
