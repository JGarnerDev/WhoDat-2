import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ProtectedRoute from "./protected.route";

import Home from "./containers/Home";
import Login from "./containers/Admin/Login";
import Logout from "./containers/Admin/Logout";
import CharacterView from "./components/Characters/CharacterView";
import UserView from "./components/User/UserView";
import Create from "./containers/Character/CreateCharacter";

const Routes = ({ user }) => {
	return (
		<Switch>
			{/* Open Routes  */}
			<Route path="/" exact component={Home} />
			<Route path="/login" exact component={Login} />
			<Route path="/create" exact component={Create} />
			<Route path="/character/:id" exact component={CharacterView} />
			{/* Private Routes */}
			<ProtectedRoute
				path="/user/logout"
				exact
				component={Logout}
				isAuth={user.isAuth}
			/>
			<ProtectedRoute
				path="/user/:id"
				exact
				component={UserView}
				isAuth={user.isAuth}
			/>

			{/* reroutes any address that the above don't match with, and sends them to the home page */}
			<Route path="*" render={() => <Redirect to="/" />} />
		</Switch>
	);
};

export default Routes;
