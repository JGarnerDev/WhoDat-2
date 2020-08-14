import React from "react";

import { Link } from "react-router-dom";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import DeviceHubOutlinedIcon from "@material-ui/icons/DeviceHubOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";

const linkContent = {
	login: ["/login", <PersonAddIcon />, "Log in / Register"],
	logout: ["/logout", <ExitToAppOutlinedIcon />, "Log out"],
	home: ["/home", <HomeIcon />, "Home"],
	settings: ["/settings", <SettingsIcon />, "Account Settings"],
	community: ["/community", <DeviceHubOutlinedIcon />, "Community"],
	characters: [
		"/characters",
		<PeopleAltOutlinedIcon />,
		"Community Characters",
	],
	create: ["/create", <AddCircleRoundedIcon />, "Create New Character"],
};

export default function NavLink(props) {
	const contents = linkContent[props.navLinkPath];

	return (
		<Link to={contents[0]}>
			{contents[1]} {contents[2]}
		</Link>
	);
}
