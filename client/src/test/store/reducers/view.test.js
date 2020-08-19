import { actionTypes } from "../../../store/actions/index";
import viewReducer from "../../../store/reducers/view";

describe("User reducer", () => {
	describe("Sanity tests", () => {
		it("has a module", () => {
			expect(viewReducer).toBeDefined();
		});
		it("returns default state `{ }` when no action type case is matched", () => {
			const state = undefined;
			const action = { type: actionTypes.FOO, payload: "BAR" };
			const defaultState = viewReducer(state, action);
			const expected = {};

			expect(defaultState).toEqual(expected);
		});
	});
	describe("SET_VIEW action type", () => {
		it("should ", () => {
			const state = undefined;
			const action = { type: actionTypes.SET_VIEW, payload: "character" };
			const defaultState = viewReducer(state, action);
			const expected = { current: "character" };

			expect(defaultState).toEqual(expected);
		});
	});
	describe("USER_GET action type", () => {
		it("should ", () => {
			const state = undefined;
			const action = {
				type: actionTypes.USER_GET,
				payload: { id: "1234", name: "FOO", lastname: "BAR" },
			};
			const defaultState = viewReducer(state, action);
			const expected = { user: { id: "1234", name: "FOO", lastname: "BAR" } };

			expect(defaultState).toEqual(expected);
		});
	});
	describe("CHARACTER_GET action type", () => {
		it("should ", () => {
			const state = undefined;
			const action = {
				type: actionTypes.CHARACTER_GET,
				payload: { id: "1234", name: "FOO", lastname: "BAR" },
			};
			const defaultState = viewReducer(state, action);
			const expected = {
				character: { id: "1234", name: "FOO", lastname: "BAR" },
			};

			expect(defaultState).toEqual(expected);
		});
	});
	describe("GLOBAL_STATE_RESET action type", () => {
		it("clears all information in the global state", () => {
			const state = {
				current: "user",
				user: "1234",
			};
			const action = {
				type: actionTypes.GLOBAL_STATE_RESET,
			};

			const updatedState = viewReducer(state, action);
			const expected = { current: "home" };
			expect(updatedState).toEqual(expected);
		});
	});
});
