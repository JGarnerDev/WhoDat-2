import React from "react";

export default function Greeting({ user }) {
	if (!user) {
		user = { isAuth: false };
	}
	return user.isAuth ? (
		<div>
			<h1> Hey, {user.username}! </h1>
			<h3>Let's get started!</h3>
		</div>
	) : (
		<div>
			<h1> Welcome! </h1>
			<div>
				<h3>Go ahead and make a character!</h3>
				<h3>If you want to save it for future reference, make an account</h3>
			</div>
		</div>
	);
}
