import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../testUtils";

import UserView from "../../components/User/UserView";

function setup() {
	return shallow(<UserView />);
}

describe.skip("UserView Component", () => {
	it("renders without error", () => {
		const wrapper = setup();
		const node = findByTestAttr(wrapper, "component-userview");

		expect(node.length).toBe(1);
	});
});
