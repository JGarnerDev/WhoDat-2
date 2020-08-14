import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import NavLink from "../components/NavLink";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";

class Nav extends Component {
	state = {};
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

	render() {
		const anchor = "right";
		return (
			<React.Fragment key={anchor}>
				<Button onClick={this.toggleDrawer(anchor, true)}>
					<MenuRoundedIcon />
				</Button>
				<SwipeableDrawer
					anchor={anchor}
					open={this.state[anchor]}
					onClose={this.toggleDrawer(anchor, false)}
					onOpen={this.toggleDrawer(anchor, true)}
				>
					{this.props.user.isAuth ? null : <NavLink navLinkPath={"login"} />}
					{this.props.user.isAuth ? <NavLink navLinkPath={"logout"} /> : null}
					<NavLink navLinkPath={"home"} />
					{this.props.user.isAuth ? <NavLink navLinkPath={"settings"} /> : null}
					<NavLink navLinkPath={"community"} />
					<NavLink navLinkPath={"characters"} />
					<NavLink navLinkPath={"create"} />
				</SwipeableDrawer>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		view: state.view.current,
		user: state.user,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
