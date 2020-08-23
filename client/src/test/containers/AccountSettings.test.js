import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps, createTestStore } from "../testUtils";

import AccountSettings from "../../containers/Admin/AccountSettings";

const storeWithAuth = createTestStore({ user: { isAuth: true } });
const storeWithoutAuth = createTestStore({ user: { isAuth: false } });

const setupAuthAccountSettings = () => {
	const component = shallow(<AccountSettings store={storeWithAuth} />);
	return component;
};
const setupNotAuthAccountSettings = () => {
	const component = shallow(<AccountSettings store={storeWithoutAuth} />);
	return component;
};

describe("AccountSettings container component", () => {
	describe("Sanity tests", () => {
		it("has a module", () => {
			expect(AccountSettings).toBeDefined();
		});

		it("redirects to the Home page when user is not authorized", () => {
			const notAuthAccountSettings = setupNotAuthAccountSettings()
				.dive()
				.dive();

			const found = findByTestAttr(notAuthAccountSettings, "redirect-to-home");

			expect(found.length).toBe(1);
		});
		it("renders without error when the user is authorized", () => {
			const authAccountSettings = setupAuthAccountSettings().dive().dive();

			const found = findByTestAttr(
				authAccountSettings,
				"container-accountSettings"
			);

			expect(found.length).toBe(1);
		});
	});
	describe("When user is authorized", () => {
		describe("Acount Settings view", () => {
			let authAccountSettings;
			beforeAll(() => {
				authAccountSettings = setupAuthAccountSettings().dive().dive();
			});
			it("renders a `settings` header", () => {
				const found = findByTestAttr(
					authAccountSettings,
					"accountSettings-header"
				);
				expect(found.length).toBe(1);
			});

			it("renders current user info", () => {
				const found = findByTestAttr(
					authAccountSettings,
					"accountSettings-userInfo"
				);
				expect(found.length).toBe(1);
			});
			describe("Account Settings Form", () => {
				describe("Rendering", () => {
					// The form elements rely on Material UI as a dependancy,
					// 	these tests are essentially sanity checks to ensure
					//  the library is still functioning
					it("Form renders without error", () => {
						const found = findByTestAttr(
							authAccountSettings,
							"accountSettings-form"
						);
						expect(found.length).toBe(1);
					});
					it("has a username change input component", () => {
						const found = findByTestAttr(
							authAccountSettings,
							"input-changeUsername"
						);
						expect(found.length).toBe(1);
					});
					it("has a email change input component", () => {
						const found = findByTestAttr(
							authAccountSettings,
							"input-changeEmail"
						);
						expect(found.length).toBe(1);
					});
					it("has a password change input component", () => {
						const found = findByTestAttr(
							authAccountSettings,
							"input-changePassword"
						);
						expect(found.length).toBe(1);
					});
					it("has a confirm password change input component", () => {
						const found = findByTestAttr(
							authAccountSettings,
							"input-confirmChangePassword"
						);
						expect(found.length).toBe(1);
					});
				});
				describe("Username input", () => {
					it("Has a functioning value and onChange properties that update state", () => {
						let usernameInput = findByTestAttr(
							authAccountSettings,
							"input-changeUsername"
						);
						usernameInput.simulate("change", { target: { value: "Foo" } });
						usernameInput = findByTestAttr(
							authAccountSettings,
							"input-changeUsername"
						);
						const usernameStateProp = authAccountSettings.state().username;

						expect(usernameInput.props().value).toEqual("Foo");
						expect(usernameStateProp).toEqual("Foo");
					});
				});
				describe("Email input", () => {
					it("Has a functioning value and onChange properties that update state", () => {
						let emailInput = findByTestAttr(
							authAccountSettings,
							"input-changeEmail"
						);
						emailInput.simulate("change", { target: { value: "Foo" } });
						emailInput = findByTestAttr(
							authAccountSettings,
							"input-changeEmail"
						);
						const emailInputStateProp = authAccountSettings.state().email;

						expect(emailInput.props().value).toEqual("Foo");
						expect(emailInputStateProp).toEqual("Foo");
					});
				});
				describe("Password input", () => {
					it("Has a functioning value and onChange properties that update state", () => {
						let passwordInput = findByTestAttr(
							authAccountSettings,
							"input-changePassword"
						);
						passwordInput.simulate("change", { target: { value: "Foo" } });
						passwordInput = findByTestAttr(
							authAccountSettings,
							"input-changePassword"
						);
						const passwordInputStateProp = authAccountSettings.state().password;

						expect(passwordInput.props().value).toEqual("Foo");
						expect(passwordInputStateProp).toEqual("Foo");
					});
				});
				describe("Change password input", () => {
					it("Has a functioning value and onChange properties that update state", () => {
						let confirmPasswordInput = findByTestAttr(
							authAccountSettings,
							"input-confirmChangePassword"
						);
						confirmPasswordInput.simulate("change", {
							target: { value: "Foo" },
						});
						confirmPasswordInput = findByTestAttr(
							authAccountSettings,
							"input-confirmChangePassword"
						);
						const confirmPasswordInputStateProp = authAccountSettings.state()
							.confirmPassword;

						expect(confirmPasswordInput.props().value).toEqual("Foo");
						expect(confirmPasswordInputStateProp).toEqual("Foo");
					});
				});
			});
		});
	});
});
