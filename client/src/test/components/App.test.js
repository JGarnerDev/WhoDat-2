import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../testUtils";

import App from "../../App";

function setup() {
	return shallow(<App />);
}

describe.skip("Application", () => {
	it("renders without error", () => {
		const wrapper = setup();
		const node = findByTestAttr(wrapper, "component-app");

		expect(node.length).toBe(1);
	});
});
