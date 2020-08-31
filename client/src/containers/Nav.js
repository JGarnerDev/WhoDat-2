import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { logUserOut } from "../store/actions";

import NavLink from "../components/NavLink";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";

class NavContainer extends Component {
	state = {
		right: false,
	};

	toggleDrawer = (anchor, open) => (event) => {
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		this.setState({ ...this.state, [anchor]: open });
	};

	renderLinksByAuth = (userIsAuth) => {
		// These arrays establish which links (and in what order) will be rendered by matching what is available in the NavLink component

		// If a link is not rendering, it's most likely because the string here isn't matching with a string in the NavLink component

		const nonAuthLinks = ["home", "community", "characters", "create"];
		const authLinks = ["home", "logout", "community", "characters", "create"];

		function renderLink(linkname, i) {
			return (
				<NavLink
					navLinkPath={`${linkname}`}
					key={i}
					data-test={`link-${linkname}`}
				/>
			);
		}
		function renderLinksFrom(linksArr) {
			return linksArr.map((linkname, i) => {
				return renderLink(linkname, i);
			});
		}

		return userIsAuth
			? renderLinksFrom(authLinks)
			: renderLinksFrom(nonAuthLinks);
	};

	render() {
		const anchor = "right";

		return (
			<nav key={anchor} data-test="container-nav">
				<Button onClick={this.toggleDrawer(anchor, true)}>
					<MenuRoundedIcon />
				</Button>

				<SwipeableDrawer
					anchor={anchor}
					open={this.state[anchor]}
					onClick={this.toggleDrawer(anchor, false)}
					onClose={this.toggleDrawer(anchor, false)}
					onOpen={this.toggleDrawer(anchor, true)}
				>
					{this.renderLinksByAuth(this.props.user.isAuth)}
				</SwipeableDrawer>
			</nav>
		);
	}
}

NavContainer.propTypes = {
	view: PropTypes.string,
	user: PropTypes.shape({
		isAuth: PropTypes.bool,
	}),
};

function mapStateToProps(state) {
	return {
		view: state.view.current,
		user: state.user,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ logUserOut }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);
