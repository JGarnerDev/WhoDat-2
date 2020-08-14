import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../testUtils";

import UserCard from "../../components/User/UserCard";

function setup() {
	return shallow(<UserCard />);
}

describe.skip("UserCard Component", () => {
	it("renders without error", () => {
		const wrapper = setup();
		const node = findByTestAttr(wrapper, "component-usercard");

		expect(node.length).toBe(1);
	});
});
