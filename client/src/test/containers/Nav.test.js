import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps, createTestStore } from "../testUtils";

import Nav from "../../containers/Nav";

const storeWithAuth = createTestStore({ user: { isAuth: true } });
const storeWithoutAuth = createTestStore({ user: { isAuth: false } });

const setupAuthNav = (props = { open: false }) => {
	const component = shallow(<Nav {...props} store={storeWithAuth} />);
	return component;
};
const setupNotAuthNav = (props = { open: false }) => {
	const component = shallow(<Nav {...props} store={storeWithoutAuth} />);
	return component;
};

describe("Nav container component", () => {
	describe("Sanity tests", () => {
		it("has a module", () => {
			expect(Nav).toBeDefined();
		});

		it("renders without error when user is not authorized", () => {
			const notAuthUserNav = setupNotAuthNav().dive().dive();

			const found = findByTestAttr(notAuthUserNav, "container-nav");
			expect(found.length).toBe(1);
		});

		it("renders without error when user is authorized", () => {
			const authUserNav = setupAuthNav().dive().dive();

			const found = findByTestAttr(authUserNav, "container-nav");
			expect(found.length).toBe(1);
		});
	});
	describe("PropTypes", () => {
		it("does not throw a warning", () => {
			const notAuthUserNav = setupNotAuthNav().dive().dive();
			const conformingProps = {
				view: "foo",
				user: {
					isAuth: 5,
				},
			};
			const warning = checkProps(notAuthUserNav, conformingProps);
			expect(warning).toBeUndefined();
		});
	});

	describe("When user is not authorized", () => {
		let notAuthUserNav;

		beforeAll(() => {
			notAuthUserNav = setupNotAuthNav().dive().dive();
		});

		describe("it renders the appropriate links for unauthorized users", () => {
			it("should render `home` link ", () => {
				const found = findByTestAttr(notAuthUserNav, "link-home");
				expect(found.length).toBe(1);
			});
			it("should render `community` link ", () => {
				const found = findByTestAttr(notAuthUserNav, "link-community");
				expect(found.length).toBe(1);
			});
			it("should render `characters` link ", () => {
				const found = findByTestAttr(notAuthUserNav, "link-characters");
				expect(found.length).toBe(1);
			});
			it("should render `create new characters` link ", () => {
				const found = findByTestAttr(notAuthUserNav, "link-create");
				expect(found.length).toBe(1);
			});
		});

		describe("it does not render the protected links intended for authorized users", () => {
			it("does not render `logout` link ", () => {
				const found = findByTestAttr(notAuthUserNav, "link-logout");
				expect(found.length).toBe(0);
			});
		});
	});

	describe("When user is authorized", () => {
		let authUserNav;
		beforeAll(() => {
			authUserNav = setupAuthNav().dive().dive();
		});
		describe("it renders the appropriate links for authorized users", () => {
			it("should render `logout` link ", () => {
				const found = findByTestAttr(authUserNav, "link-logout");
				expect(found.length).toBe(1);
			});
			it("should render `home` link ", () => {
				const found = findByTestAttr(authUserNav, "link-home");
				expect(found.length).toBe(1);
			});
			it("should render `community` link ", () => {
				const found = findByTestAttr(authUserNav, "link-community");
				expect(found.length).toBe(1);
			});
			it("should render `characters` link ", () => {
				const found = findByTestAttr(authUserNav, "link-characters");
				expect(found.length).toBe(1);
			});
			it("should render `create new characters` link ", () => {
				const found = findByTestAttr(authUserNav, "link-create");
				expect(found.length).toBe(1);
			});
		});
	});
});
