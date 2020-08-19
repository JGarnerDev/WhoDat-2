import { actionTypes } from "../../../store/actions/index";
import listReducer from "../../../store/reducers/list";

describe("List reducer", () => {
	// this reducer is responsible for handling the list view for both
	// 	characters and users (i.e. when the user sees a list of
	// 	characters or users to select from and see more details)

	describe("Sanity tests", () => {
		it("has a module", () => {
			expect(listReducer).toBeDefined();
		});
		it("returns default state `{}` when no action type case is matched", () => {
			const previousState = undefined;
			const action = { type: "FOO", payload: "BAR" };
			const updatedState = listReducer(previousState, action);
			const expected = {};

			expect(updatedState).toEqual(expected);
		});
	});

	describe("USERS_GET_LIST action type", () => {
		it("will update `users` value with the action payload when there is no previous value", () => {
			const previousState = undefined;
			const action = {
				type: "USERS_GET_LIST",
				payload: [{ foo: "FOO" }, { bar: "BAR" }],
			};
			const updatedState = listReducer(previousState, action);
			const expected = { users: [{ foo: "FOO" }, { bar: "BAR" }] };

			expect(updatedState).toEqual(expected);
		});
		it("will replace `users` value with the action payload when there is a previous value", () => {
			const previousState = { users: [{ Chuck: "SUP" }, { YAG: "UHHH" }] };
			const action = {
				type: "USERS_GET_LIST",
				payload: [{ foo: "FOO" }, { bar: "BAR" }],
			};
			const updatedState = listReducer(previousState, action);
			const expected = { users: [{ foo: "FOO" }, { bar: "BAR" }] };

			expect(updatedState).toEqual(expected);
		});
		it("updates the `users` value without altering other parts of state", () => {
			const previousState = {
				characters: [{ bob: "BOB" }, { Zardoz: "Zardoz" }],
			};
			const action = {
				type: "USERS_GET_LIST",
				payload: [{ foo: "FOO" }, { bar: "BAR" }],
			};
			const updatedState = listReducer(previousState, action);
			const expected = {
				...previousState,
				users: [{ foo: "FOO" }, { bar: "BAR" }],
			};

			expect(updatedState).toEqual(expected);
		});
	});

	describe("CHARACTERS_GET_LIST action type", () => {
		it("will update `characters` value with the action payload when there is no previous value", () => {
			const previousState = undefined;
			const action = {
				type: "CHARACTERS_GET_LIST",
				payload: [{ foo: "FOO" }, { bar: "BAR" }],
			};
			const updatedState = listReducer(previousState, action);
			const expected = { characters: [{ foo: "FOO" }, { bar: "BAR" }] };

			expect(updatedState).toEqual(expected);
		});
		it("will replace `characters` value with the action payload when there is a previous value", () => {
			const previousState = { characters: [{ Chuck: "SUP" }, { YAG: "UHHH" }] };
			const action = {
				type: "CHARACTERS_GET_LIST",
				payload: [{ foo: "FOO" }, { bar: "BAR" }],
			};
			const updatedState = listReducer(previousState, action);
			const expected = { characters: [{ foo: "FOO" }, { bar: "BAR" }] };

			expect(updatedState).toEqual(expected);
		});
		it("updates the `characters` value without altering other parts of state", () => {
			const previousState = { users: [{ bob: "BOB" }, { Zardoz: "Zardoz" }] };
			const action = {
				type: "CHARACTERS_GET_LIST",
				payload: [{ foo: "FOO" }, { bar: "BAR" }],
			};
			const updatedState = listReducer(previousState, action);
			const expected = {
				...previousState,
				characters: [{ foo: "FOO" }, { bar: "BAR" }],
			};

			expect(updatedState).toEqual(expected);
		});
	});
	describe("CHARACTERS_GET_BY_AUTHOR action type", () => {
		it("will update `characters` value with the action payload when there is no previous value", () => {
			const previousState = undefined;
			const action = {
				type: "CHARACTERS_GET_BY_AUTHOR",
				payload: [{ foo: "FOO" }, { bar: "BAR" }],
			};
			const updatedState = listReducer(previousState, action);
			const expected = { characters: [{ foo: "FOO" }, { bar: "BAR" }] };

			expect(updatedState).toEqual(expected);
		});
		it("will replace `characters` value with the action payload when there is a previous value", () => {
			const previousState = { characters: [{ Chuck: "SUP" }, { YAG: "UHHH" }] };
			const action = {
				type: "CHARACTERS_GET_BY_AUTHOR",
				payload: [{ foo: "FOO" }, { bar: "BAR" }],
			};
			const updatedState = listReducer(previousState, action);
			const expected = { characters: [{ foo: "FOO" }, { bar: "BAR" }] };

			expect(updatedState).toEqual(expected);
		});
		it("updates the `characters` value without altering other parts of state", () => {
			const previousState = { users: [{ bob: "BOB" }, { Zardoz: "Zardoz" }] };
			const action = {
				type: "CHARACTERS_GET_BY_AUTHOR",
				payload: [{ foo: "FOO" }, { bar: "BAR" }],
			};
			const updatedState = listReducer(previousState, action);
			const expected = {
				...previousState,
				characters: [{ foo: "FOO" }, { bar: "BAR" }],
			};

			expect(updatedState).toEqual(expected);
		});
		describe("GLOBAL_STATE_RESET action type", () => {
			// This action type clears the entire redux state
			it("clears all information in the `list` state", () => {
				const previousState = { foo: "foo", bar: "bar", success: true };
				const action = {
					type: actionTypes.GLOBAL_STATE_RESET,
				};
				const newState = listReducer(previousState, action);
				const expected = {};

				expect(newState).toEqual(expected);
			});
		});
	});
});
