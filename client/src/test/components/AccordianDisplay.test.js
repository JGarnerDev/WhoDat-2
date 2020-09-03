import React from "react";
import { shallow } from "enzyme";

import {
	findByTestAttr,
	checkProps,
	createTestStore,
	diveTwiceIn,
} from "../testUtils";

import AccordianDisplay from "../../components/AccordionDisplay";

function setup(props) {
	return shallow(<AccordianDisplay {...props} />);
}

function testHeader(header) {
	return <h1>{header}</h1>;
}

describe("AccordianDisplay functional component", () => {
	describe("Sanity Tests", () => {
		it("has a module", () => {
			expect(AccordianDisplay).toBeDefined();
		});
		it("renders without error", () => {
			const component = setup();
			const found = findByTestAttr(component, "component-accordion");
			expect(found.length).toBe(1);
		});
	});
	describe("Rendering", () => {
		it("renders the `details` prop as what you see when it is not expanded", () => {
			const text = "Test";
			const element = testHeader(text);
			const component = setup({ details: element });

			const found = findByTestAttr(component, "accordian-details");
			expect(found.length).toBe(1);
			expect(found.text()).toContain(text);
		});
		it("renders the `Summary` prop as what you see when it is expanded", () => {
			const text = "Test";
			const element = testHeader(text);
			const component = setup({ summary: element });

			const found = findByTestAttr(component, "accordian-summary");
			expect(found.length).toBe(1);
			expect(found.text()).toContain(text);
		});
	});
});
