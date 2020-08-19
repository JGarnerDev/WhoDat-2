import { actionTypes } from "../../../store/actions/index";
import viewReducer from "../../../store/reducers/view";

describe("View reducer", () => {
	// this reducer is responsible for handling the 'view' previousState, which is to keep track of where the user is on the app
	describe("Sanity tests", () => {
		it("has a module", () => {
			expect(viewReducer).toBeDefined();
		});
		it("returns default previousState `{ }` when no action type case is matched", () => {
			const previousState = undefined;
			const action = { type: "FOO", payload: "BAR" };
			const updatedState = viewReducer(previousState, action);
			const expected = {};

			expect(updatedState).toEqual(expected);
		});
	});
	describe("SET_VIEW action type", () => {
		it("should set the view value properly", () => {
			const previousState = undefined;
			const action = { type: actionTypes.SET_VIEW, payload: "home" };
			const updatedState = viewReducer(previousState, action);
			const expected = { current: "home" };

			expect(updatedState).toEqual(expected);
		});
		it("does not alter other state values", () => {
			const previousState = { character: "Bob" };
			const action = { type: actionTypes.SET_VIEW, payload: "home" };
			const updatedState = viewReducer(previousState, action);
			const expected = { character: "Bob", current: "home" };

			expect(updatedState).toEqual(expected);
		});
	});
	describe("USER_GET action type", () => {
		it("should set the user value properly", () => {
			const previousState = undefined;
			const action = {
				type: actionTypes.USER_GET,
				payload: { id: "1234", name: "FOO", lastname: "BAR" },
			};
			const updatedState = viewReducer(previousState, action);
			const expected = { user: { id: "1234", name: "FOO", lastname: "BAR" } };

			expect(updatedState).toEqual(expected);
		});
		it("does not alter other state values", () => {
			const previousState = { view: "user" };
			const action = {
				type: actionTypes.USER_GET,
				payload: { id: "1234", name: "FOO", lastname: "BAR" },
			};
			const updatedState = viewReducer(previousState, action);
			const expected = {
				view: "user",
				user: { id: "1234", name: "FOO", lastname: "BAR" },
			};

			expect(updatedState).toEqual(expected);
		});
	});
	describe("CHARACTER_GET action type", () => {
		it("should set the character value properly ", () => {
			const previousState = undefined;
			const action = {
				type: actionTypes.CHARACTER_GET,
				payload: { id: "1234", name: "FOO" },
			};
			const updatedState = viewReducer(previousState, action);
			const expected = {
				character: { id: "1234", name: "FOO" },
			};

			expect(updatedState).toEqual(expected);
		});
		it("does not alter other state values ", () => {
			const previousState = { view: "character" };
			const action = {
				type: actionTypes.CHARACTER_GET,
				payload: { id: "1234", name: "FOO" },
			};
			const updatedState = viewReducer(previousState, action);
			const expected = {
				view: "character",
				character: { id: "1234", name: "FOO" },
			};

			expect(updatedState).toEqual(expected);
		});
	});
	describe("GLOBAL_STATE_RESET action type", () => {
		// Upon a global state reset, a redirection to the 'home'
		// 	page should be performed
		it("clears all information in the global previousState", () => {
			const previousState = {
				current: "user",
				user: "1234",
			};
			const action = {
				type: actionTypes.GLOBAL_STATE_RESET,
			};

			const updatedState = viewReducer(previousState, action);
			const expected = { current: "home" };
			expect(updatedState).toEqual(expected);
		});
	});
});
