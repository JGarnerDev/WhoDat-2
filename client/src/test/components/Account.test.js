import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../testUtils";

import Account from "../../components/User/Account";

function setup() {
	return shallow(<Account />);
}

describe.skip("Account Component", () => {
	it("renders without error", () => {
		const wrapper = setup();
		const node = findByTestAttr(wrapper, "component-account");

		expect(node.length).toBe(1);
	});
});
