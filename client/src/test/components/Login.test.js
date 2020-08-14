import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../testUtils";

import Login from "../../components/Login";

function setup() {
	return shallow(<Login />);
}

describe.skip("Login Component", () => {
	it("renders without error", () => {
		const wrapper = setup();
		const node = findByTestAttr(wrapper, "component-login");

		expect(node.length).toBe(1);
	});
});
