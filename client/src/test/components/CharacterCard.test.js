import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../testUtils";

import CharacterCard from "../../components/Characters/CharacterCard";

function setup() {
	return shallow(<CharacterCard />);
}

describe.skip("CharacterCard Component", () => {
	it("renders without error", () => {
		const wrapper = setup();
		const node = findByTestAttr(wrapper, "component-charactercard");

		expect(node.length).toBe(1);
	});
});
