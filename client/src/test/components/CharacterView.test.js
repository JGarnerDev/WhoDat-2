import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../testUtils";

import CharacterView from "../../components/Characters/CharacterView";

function setup() {
	return shallow(<CharacterView />);
}

describe.skip("CharacterView Component", () => {
	it("renders without error", () => {
		const wrapper = setup();
		const node = findByTestAttr(wrapper, "component-characterview");

		expect(node.length).toBe(1);
	});
});
