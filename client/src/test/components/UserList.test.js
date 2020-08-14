import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../testUtils";

import UserList from "../../components/User/UserList";

function setup() {
	return shallow(<UserList />);
}

describe.skip("UserList Component", () => {
	it("renders without error", () => {
		const wrapper = setup();
		const node = findByTestAttr(wrapper, "component-userlist");

		expect(node.length).toBe(1);
	});
});
