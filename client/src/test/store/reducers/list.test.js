import { actionTypes } from "../../../store/actions/index";
import listReducer from "../../../store/reducers/list";

describe("List reducer", () => {
	// this reducer is responsible for handling collections of
	//  users or characters for displaying them in a list

	describe("Sanity tests", () => {
		it("has a module", () => {
			expect(listReducer).toBeDefined();
		});
		it("returns default state `{}` when no action type case is matched", () => {
			const state = undefined;
			const action = { type: "FOO", payload: "BAR" };
			const defaultState = listReducer(state, action);
			const expected = {};

			expect(defaultState).toEqual(expected);
		});
	});

	describe("USERS_GET_LIST action type", () => {
		it("will update `users` value with the action payload when there is no previous value", () => {
			const state = undefined;
			const action = {
				type: "USERS_GET_LIST",
				payload: [{ foo: "FOO" }, { bar: "BAR" }],
			};
			const defaultState = listReducer(state, action);
			const expected = { users: [{ foo: "FOO" }, { bar: "BAR" }] };

			expect(defaultState).toEqual(expected);
		});
		it("will replace `users` value with the action payload when there is a previous value", () => {
			const state = { users: [{ Chuck: "SUP" }, { YAG: "UHHH" }] };
			const action = {
				type: "USERS_GET_LIST",
				payload: [{ foo: "FOO" }, { bar: "BAR" }],
			};
			const defaultState = listReducer(state, action);
			const expected = { users: [{ foo: "FOO" }, { bar: "BAR" }] };

			expect(defaultState).toEqual(expected);
		});
		it("updates the `users` value without altering other parts of state", () => {
			const state = { characters: [{ bob: "BOB" }, { Zardoz: "Zardoz" }] };
			const action = {
				type: "USERS_GET_LIST",
				payload: [{ foo: "FOO" }, { bar: "BAR" }],
			};
			const defaultState = listReducer(state, action);
			const expected = { ...state, users: [{ foo: "FOO" }, { bar: "BAR" }] };

			expect(defaultState).toEqual(expected);
		});
	});

	describe("CHARACTERS_GET_LIST action type", () => {
		it("will update `characters` value with the action payload when there is no previous value", () => {
			const state = undefined;
			const action = {
				type: "CHARACTERS_GET_LIST",
				payload: [{ foo: "FOO" }, { bar: "BAR" }],
			};
			const defaultState = listReducer(state, action);
			const expected = { characters: [{ foo: "FOO" }, { bar: "BAR" }] };

			expect(defaultState).toEqual(expected);
		});
		it("will replace `characters` value with the action payload when there is a previous value", () => {
			const state = { characters: [{ Chuck: "SUP" }, { YAG: "UHHH" }] };
			const action = {
				type: "CHARACTERS_GET_LIST",
				payload: [{ foo: "FOO" }, { bar: "BAR" }],
			};
			const defaultState = listReducer(state, action);
			const expected = { characters: [{ foo: "FOO" }, { bar: "BAR" }] };

			expect(defaultState).toEqual(expected);
		});
		it("updates the `characters` value without altering other parts of state", () => {
			const state = { users: [{ bob: "BOB" }, { Zardoz: "Zardoz" }] };
			const action = {
				type: "CHARACTERS_GET_LIST",
				payload: [{ foo: "FOO" }, { bar: "BAR" }],
			};
			const defaultState = listReducer(state, action);
			const expected = {
				...state,
				characters: [{ foo: "FOO" }, { bar: "BAR" }],
			};

			expect(defaultState).toEqual(expected);
		});
	});
	describe("CHARACTERS_GET_BY_AUTHOR action type", () => {
		it("will update `characters` value with the action payload when there is no previous value", () => {
			const state = undefined;
			const action = {
				type: "CHARACTERS_GET_BY_AUTHOR",
				payload: [{ foo: "FOO" }, { bar: "BAR" }],
			};
			const defaultState = listReducer(state, action);
			const expected = { characters: [{ foo: "FOO" }, { bar: "BAR" }] };

			expect(defaultState).toEqual(expected);
		});
		it("will replace `characters` value with the action payload when there is a previous value", () => {
			const state = { characters: [{ Chuck: "SUP" }, { YAG: "UHHH" }] };
			const action = {
				type: "CHARACTERS_GET_BY_AUTHOR",
				payload: [{ foo: "FOO" }, { bar: "BAR" }],
			};
			const defaultState = listReducer(state, action);
			const expected = { characters: [{ foo: "FOO" }, { bar: "BAR" }] };

			expect(defaultState).toEqual(expected);
		});
		it("updates the `characters` value without altering other parts of state", () => {
			const state = { users: [{ bob: "BOB" }, { Zardoz: "Zardoz" }] };
			const action = {
				type: "CHARACTERS_GET_BY_AUTHOR",
				payload: [{ foo: "FOO" }, { bar: "BAR" }],
			};
			const defaultState = listReducer(state, action);
			const expected = {
				...state,
				characters: [{ foo: "FOO" }, { bar: "BAR" }],
			};

			expect(defaultState).toEqual(expected);
		});
		describe("GLOBAL_STATE_RESET action type", () => {
			// This action type clears the entire redux state
			it("clears all information in the character state", () => {
				const state = { foo: "foo", bar: "bar", success: true };
				const action = {
					type: actionTypes.GLOBAL_STATE_RESET,
				};
				const newState = listReducer(state, action);
				const expected = {};

				expect(newState).toEqual(expected);
			});
		});
	});
});
