import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../testUtils";

import Greeting from "../../components/Greeting";

const setup = (props = {}) => {
	const component = shallow(<Greeting {...props} />);
	return component;
};

describe("Greeting functional component", () => {
	describe("Sanity tests", () => {
		it("has a module", () => {
			expect(Greeting).toBeDefined();
		});
	});
});
