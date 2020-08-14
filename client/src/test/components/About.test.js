import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../testUtils";

import About from "../../components/About";

function setup() {
	return shallow(<About />);
}

describe.skip("About Component", () => {
	it("renders without error", () => {
		const wrapper = setup();
		const node = findByTestAttr(wrapper, "component-about");

		expect(node.length).toBe(1);
	});
});
