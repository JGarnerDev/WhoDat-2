import React from "react";

import { shallow } from "enzyme";

import { findByTestAttr } from "../testUtils";

import Nav from "../../components/Nav";

function setup() {
	return shallow(<Nav />);
}

describe.skip("Nav component", () => {
	it("renders without error", () => {
		const wrapper = setup();
		const node = findByTestAttr(wrapper, "component-nav");

		expect(node.length).toBe(1);
	});
});
