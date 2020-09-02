import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps, createTestStore } from "../testUtils";

import Home from "../../containers/Home";

const storeWithAuth = createTestStore({
	user: {
		isAuth: true,
		logout: false,
		notifications: { welcome: 0, goodbye: 0 },
	},
});
const storeWithoutAuth = createTestStore({
	user: {
		isAuth: false,
		logout: false,
		notifications: { welcome: 0, goodbye: 0 },
	},
});

const setupAuthHome = () => {
	const component = shallow(<Home store={storeWithAuth} />);
	return component;
};
const setupNotAuthHome = () => {
	const component = shallow(<Home store={storeWithoutAuth} />);
	return component;
};

describe("Home component", () => {
	describe("Sanity tests", () => {
		it("has a module", () => {
			expect(Home).toBeDefined();
		});

		it("renders without error when user is not authorized", () => {
			const notAuthHome = setupNotAuthHome().dive().dive();

			const found = findByTestAttr(notAuthHome, "container-home");
			expect(found.length).toBe(1);
		});

		it("renders without error when user is authorized", () => {
			const AuthHome = setupAuthHome().dive().dive();

			const found = findByTestAttr(AuthHome, "container-home");
			expect(found.length).toBe(1);
		});
	});
});
