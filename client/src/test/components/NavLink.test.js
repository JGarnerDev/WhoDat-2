import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../testUtils";

import NavLink from "../../components/NavLink";

const setup = (props = {}) => {
	const component = shallow(<NavLink {...props} />);
	return component;
};

describe("NavLink functional component", () => {
	describe("Sanity tests", () => {
		it("has a module", () => {
			expect(NavLink).toBeDefined();
		});

		it("doesn't render without props", () => {
			const component = setup();
			const found = findByTestAttr(component, "component-NavLink");
			expect(component.props()).toEqual({});
			expect(found.length).toBe(0);
		});

		it("renders without error with an appropriate string props", () => {
			// "home" as navLinkPath prop was selected arbitrarily from those
			// 		established in the NavLivk's linkContent
			const component = setup({ navLinkPath: "home" });
			const NavLink = findByTestAttr(component, "component-NavLink");
			const iconWrapper = findByTestAttr(component, "NavLink-iconwrapper");

			// Renders parent element
			expect(NavLink.length).toBe(1);
			// Renders child icon-wrapper element
			expect(iconWrapper.length).toBe(1);
			// Renders svg icon

			// Renders some text
			expect(NavLink.text()).toBeDefined();
		});
	});
	describe("Unit tests", () => {
		it("doesn't render", () => {});
	});
});
