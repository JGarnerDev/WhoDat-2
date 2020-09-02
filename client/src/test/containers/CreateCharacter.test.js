import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, checkProps, createTestStore } from "../testUtils";

import CreateCharacter from "../../containers/Character/CreateCharacter";

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

const setupAuthCreateCharacter = () => {
	const component = shallow(<CreateCharacter store={storeWithAuth} />);
	return component.dive().dive();
};
const setupNotAuthCreateCharacter = () => {
	const component = shallow(<CreateCharacter store={storeWithoutAuth} />);
	return component.dive().dive();
};

describe("CreateCharacter container component", () => {
	describe("Sanity Tests", () => {
		it("has a module", () => {
			expect(CreateCharacter).toBeDefined();
		});
		it("renders without error when user is authorized", () => {
			const CreateCharacter = setupAuthCreateCharacter();
			const found = findByTestAttr(CreateCharacter, "component-create");
			expect(found.length).toBe(1);
		});
		it("renders without error when user is not authorized", () => {
			const CreateCharacter = setupNotAuthCreateCharacter();
			const found = findByTestAttr(CreateCharacter, "component-create");
			expect(found.length).toBe(1);
		});
	});
	describe("Logic", () => {
		it("", () => {});
	});
});
