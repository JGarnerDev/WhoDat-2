import React from "react";

export default function Greeting({ user }) {
	if (!user) {
		user = { isAuth: false };
	}
	return user.isAuth ? (
		<div>
			<h1> Hey, {user.name}! </h1>
			<h3 data-test="cta">Let's get started!</h3>
		</div>
	) : (
		<div>
			<h1> Welcome! </h1>
			<div data-test="instructions">
				<h3>Go ahead and make a character!</h3>
				<h3>If you want to save it for future reference, make an account</h3>
			</div>
		</div>
	);
}
