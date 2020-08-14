import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../testUtils";

import CharacterList from "../../components/Characters/CharacterList";

function setup() {
	return shallow(<CharacterList />);
}

describe.skip("CharacterList Component", () => {
	it("renders without error", () => {
		const wrapper = setup();
		const node = findByTestAttr(wrapper, "component-characterlist");

		expect(node.length).toBe(1);
	});
});
