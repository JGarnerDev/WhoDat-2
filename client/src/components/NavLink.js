import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import DeviceHubOutlinedIcon from "@material-ui/icons/DeviceHubOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";

const linkContent = {
	home: ["/home", <HomeIcon />, "Home"],
	login: ["/login", <PersonAddIcon />, "Log in / Register"],
	logout: ["/user/logout", <ExitToAppOutlinedIcon />, "Log out"],
	settings: ["/user/settings", <SettingsIcon />, "Account Settings"],
	community: ["/community", <DeviceHubOutlinedIcon />, "Community"],
	characters: ["/characters", <PeopleAltOutlinedIcon />, "Characters"],
	create: ["/create", <AddCircleRoundedIcon />, "Create New Character"],
};

// The NavLink component only renders when it has a navLinkPath string prop that matches with the keys of linkContent above.
//

function NavLink({ navLinkPath }) {
	const contents = linkContent[navLinkPath] || null;

	return contents ? (
		<Link to={contents[0]} data-test="component-NavLink">
			<div data-test="NavLink-iconwrapper">{contents[1]}</div>
			<div>{contents[2]}</div>
		</Link>
	) : null;
}

NavLink.propTypes = {
	navLinkPath: PropTypes.string,
};

export default NavLink;
