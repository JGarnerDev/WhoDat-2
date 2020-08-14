import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../testUtils";

import Create from "../../components/Characters/Create";

function setup() {
	return shallow(<Create />);
}

describe.skip("Create Component", () => {
	it("renders without error", () => {
		const wrapper = setup();
		const node = findByTestAttr(wrapper, "component-create");

		expect(node.length).toBe(1);
	});
});
