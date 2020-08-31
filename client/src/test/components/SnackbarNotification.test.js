import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr } from "../testUtils";

import SnackbarNotification from "../../components/SnackbarNotification";

const setup = (props = { message: "Test" }) => {
	return shallow(<SnackbarNotification {...props} />);
};

describe("Snackbar Notification", () => {
	describe("Sanity Tests", () => {
		it("should have a module", () => {
			expect(SnackbarNotification).toBeDefined();
		});

		it("renders without error", () => {
			const Snackbar = setup();
			const found = findByTestAttr(Snackbar, "component-snackbar");
			expect(found.length).toBe(1);
		});
	});
	describe("Styling", () => {
		it("should have the `success` class if the message indicates a success", () => {
			const Snackbar = setup({ message: "A message with `success` " });
			const successClass = Snackbar.find(".snackNotification-success");
			expect(successClass.length).toBe(1);
		});
		it("should have the `failure` class if the message indicates a failure", () => {
			const Snackbar = setup({ message: "A message with `failure` " });
			const failClass = Snackbar.find(".snackNotification-fail");
			expect(failClass.length).toBe(1);
		});
		it("should have the `neutral` class if the message indicates neither success or failure", () => {
			const Snackbar = setup({ message: "A message " });
			const neutralClass = Snackbar.find(".snackNotification-neutral");
			expect(neutralClass.length).toBe(1);
		});
	});
});
