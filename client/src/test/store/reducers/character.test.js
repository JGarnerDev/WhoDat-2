import { actionTypes } from "../../../store/actions/index";
import characterReducer from "../../../store/reducers/character";

describe("Character reducer", () => {
	// this reducer is responsible for handling the character creation process
	// 	(character CRUD with Mongo and the creation within the browser)
	describe("Sanity tests", () => {
		it("has a module", () => {
			expect(characterReducer).toBeDefined();
		});
		it("returns default state `{}` when no action type case is matched", () => {
			const previousState = undefined;
			const action = { type: "FOO", payload: "BAR" };
			const defaultState = characterReducer(previousState, action);
			const expectedState = {};

			expect(defaultState).toEqual(expectedState);
		});
	});

	describe("CHARACTER_SAVE action type", () => {
		// This action is responsible for saving the target character to Mongo
		// 	then returning a success (boolean) value and a confirmation message (string)

		it("updates the 'saved' value appropriately when saving was successful", () => {
			const previousState = undefined;
			const action = {
				type: actionTypes.CHARACTER_SAVE,
				payload: { success: true, message: "Character saved!" },
			};
			const newState = characterReducer(previousState, action);
			const expectedState = {
				saved: { success: true, message: "Character saved!" },
			};

			expect(newState).toEqual(expectedState);
		});

		it("updates the 'saved' value appropriately when saving was unsuccessful", () => {
			const previousState = undefined;
			const action = {
				type: actionTypes.CHARACTER_SAVE,
				payload: {
					success: false,
					message:
						"Unfortunately, there was an error in creating this character.",
				},
			};
			const newState = characterReducer(previousState, action);
			const expectedState = {
				saved: {
					success: false,
					message:
						"Unfortunately, there was an error in creating this character.",
				},
			};

			expect(newState).toEqual(expectedState);
		});
		it("updates the 'saved' value without altering other parts of state", () => {
			const previousState = { foo: "FOO", bar: "BAR" };
			const action = {
				type: actionTypes.CHARACTER_SAVE,
				payload: { success: true, message: "Character saved!" },
			};
			const newState = characterReducer(previousState, action);
			const expectedState = {
				...previousState,
				saved: {
					success: true,
					message: "Character saved!",
				},
			};

			expect(newState).toEqual(expectedState);
		});
	});

	describe("CHARACTER_UPDATE action type", () => {
		// This action is responsible for updating the target character on Mongo
		// 	with the argument then returning a success (boolean) value and a
		// 	confirmation message (string)
		it("updates the 'updated' value to true when the payload is true", () => {
			const previousState = undefined;
			const action = {
				type: actionTypes.CHARACTER_UPDATE,
				payload: { success: true, message: `Foo was successfully updated!` },
			};
			const newState = characterReducer(previousState, action);
			const expectedState = {
				updated: {
					success: true,
					message: `Foo was successfully updated!`,
				},
			};

			expect(newState).toEqual(expectedState);
		});
		it("updates the 'updated' value to false when the payload is false", () => {
			const previousState = undefined;
			const action = {
				type: actionTypes.CHARACTER_UPDATE,
				payload: {
					success: false,
					message:
						"Unfortunately, there was an error in locating your character for updating. ",
				},
			};
			const newState = characterReducer(previousState, action);
			const expectedState = {
				updated: {
					success: false,
					message:
						"Unfortunately, there was an error in locating your character for updating. ",
				},
			};

			expect(newState).toEqual(expectedState);
		});
		it("updates the 'saved' value without altering other parts of state", () => {
			const previousState = { foo: "foo", bar: "bar" };
			const action = {
				type: actionTypes.CHARACTER_UPDATE,
				payload: {
					success: true,
					message: `Foo was successfully updated!`,
				},
			};
			const newState = characterReducer(previousState, action);
			const expectedState = {
				...previousState,
				updated: {
					success: true,
					message: `Foo was successfully updated!`,
				},
			};

			expect(newState).toEqual(expectedState);
		});
	});
	describe("CHARACTER_DELETE action type", () => {
		// This action is responsible for deleting the target character on Mongo
		// 	then returning a success (boolean) value and a confirmation message (string)

		// Since character deletion should remove client-side data as well,
		// 	the entire character state is replaced with the action's payload unless
		// 	deletion was unsuccessful.

		it("replaces the character state with the deletion response when successful", () => {
			const previousState = { foo: "foo", bar: "bar", success: true };
			const action = {
				type: actionTypes.CHARACTER_DELETE,
				payload: { success: true, message: "" },
			};
			const newState = characterReducer(previousState, action);
			const expectedState = { deleted: { success: true, message: "" } };

			expect(newState).toEqual(expectedState);
		});

		it("does not replace the character state when the deletion is unsuccessful", () => {
			const previousState = { foo: "foo", bar: "bar", success: true };
			const action = {
				type: actionTypes.CHARACTER_DELETE,
				payload: {
					success: false,
					message:
						"Unfortunately, there was an error in locating Bob for deletion.",
				},
			};
			const newState = characterReducer(previousState, action);
			const expectedState = {
				...previousState,
				deleted: {
					success: false,
					message:
						"Unfortunately, there was an error in locating Bob for deletion.",
				},
			};

			expect(newState).toEqual(expectedState);
		});
	});
	describe("CHARACTER_STATE_RESET action type", () => {
		// This action type clears the entire character state, for the sake of
		// 'resetting' the creation process if a user feels like it
		it("clears all information in the character state", () => {
			const previousState = {
				foo: "foo",
				bar: "bar",
				success: true,
				something: { more: false },
			};
			const action = {
				type: actionTypes.CHARACTER_STATE_RESET,
			};
			const newState = characterReducer(previousState, action);
			const expectedState = {};

			expect(newState).toEqual(expectedState);
		});
	});
	describe("GLOBAL_STATE_RESET action type", () => {
		// This action type clears the entire redux state, and is found in all reducers.
		it("clears all information in the redux state", () => {
			const previousState = {
				foo: "foo",
				bar: "bar",
				success: true,
				something: { more: false },
			};
			const action = {
				type: actionTypes.GLOBAL_STATE_RESET,
			};
			const newState = characterReducer(previousState, action);
			const expectedState = {};

			expect(newState).toEqual(expectedState);
		});
	});
});
