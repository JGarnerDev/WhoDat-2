import React from "react";

import { shallow } from "enzyme";

import { findByTestAttr } from "../testUtils";

import Home from "../../components/Home";

function setup() {
	return shallow(<Home />);
}

describe.skip("Home component", () => {
	it("renders without error", () => {
		const wrapper = setup();
		const node = findByTestAttr(wrapper, "component-home");

		expect(node.length).toBe(1);
	});
});
