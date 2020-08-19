import { actionTypes } from "../../../store/actions/index";
import userReducer from "../../../store/reducers/user";

describe("User reducer", () => {
	// this reducer is responsible for handling the previousUser information (id, name, characters they author, etc.)

	describe("Sanity tests", () => {
		it("has a module", () => {
			expect(userReducer).toBeDefined();
		});
		it("returns default state `{ isAuth: false }` when no action type case is matched", () => {
			const previousState = undefined;
			const action = { type: actionTypes.FOO, payload: "BAR" };
			const defaultState = userReducer(previousState, action);
			const expected = { isAuth: false };

			expect(defaultState).toEqual(expected);
		});
	});

	describe("USER_REGISTER action type", () => {
		it("will update `register`, `isAuth`, and `message` value with the action payload when there is no previous value", () => {
			const previousState = undefined;
			const action = {
				type: actionTypes.USER_REGISTER,
				payload: { data: { success: true, message: "Success!" } },
			};
			const updatedState = userReducer(previousState, action);
			const expected = { register: true, isAuth: true, message: "Success!" };

			expect(updatedState).toEqual(expected);
		});
		it("will update `register`, `isAuth`, and `message` value with the action payload when isAuth is false", () => {
			const previousState = { isAuth: false };
			const action = {
				type: actionTypes.USER_REGISTER,
				payload: { data: { success: true, message: "Success!" } },
			};
			const updatedState = userReducer(previousState, action);
			const expected = { register: true, isAuth: true, message: "Success!" };

			expect(updatedState).toEqual(expected);
		});
		it("will update `register`, `isAuth`, and `message` value with the action payload when an attempt at registry did not succeed before it", () => {
			const previousState = {
				register: false,
				isAuth: false,
				message: "Sorry, my server is on fire",
			};
			const action = {
				type: actionTypes.USER_REGISTER,
				payload: { data: { success: true, message: "Success!" } },
			};
			const updatedState = userReducer(previousState, action);
			const expected = { register: true, isAuth: true, message: "Success!" };

			expect(updatedState).toEqual(expected);
		});
	});
	describe("USER_UPDATE action type", () => {
		it("will update `user` value with the action payload when there is a previous value", () => {
			const previousUser = { name: "Jack", id: "1337", email: "no@gmail.com" };
			const updatedUser = { name: "WAT", id: "WAT", email: "WAT" };
			const previousState = { isAuth: true, ...previousUser };
			const action = {
				type: actionTypes.USER_UPDATE,
				payload: updatedUser,
			};

			const updatedState = userReducer(previousState, action);
			const expected = { isAuth: true, ...updatedUser };

			expect(updatedState).toEqual(expected);
		});
	});
	describe("USER_DELETE action type", () => {
		it("will delete `user` value with the action payload when there is a previous value", () => {
			const previousUser = { name: "Jack", id: "1337", email: "no@gmail.com" };
			const previousState = { isAuth: true, user: previousUser };
			const action = {
				type: actionTypes.USER_DELETE,
			};

			const updatedState = userReducer(previousState, action);
			const expected = {};
			expect(updatedState).toEqual(expected);
		});
	});
	describe("USER_AUTH action type", () => {
		it("will update `user` value with the action payload when there is no previous value", () => {
			const previousState = undefined;
			const action = {
				type: actionTypes.USER_AUTH,
				payload: {
					isAuth: true,
					id: "123",
					email: "no@gmail.com",
					name: "Jack",
					lastname: "Reginold",
				},
			};

			const updatedState = userReducer(previousState, action);
			const expected = {
				isAuth: true,
				id: "123",
				email: "no@gmail.com",
				name: "Jack",
				lastname: "Reginold",
			};
			expect(updatedState).toEqual(expected);
		});
	});
	describe("USER_LOGIN action type", () => {
		it("will update `users` value with the action payload when there is no previous value", () => {
			const previousState = undefined;
			const action = {
				type: actionTypes.USER_LOGIN,
				payload: {
					isAuth: true,
					id: "123",
					email: "no@gmail.com",
					name: "Jack",
					lastname: "Reginold",
				},
			};

			const updatedState = userReducer(previousState, action);
			const expected = {
				isAuth: true,
				id: "123",
				email: "no@gmail.com",
				name: "Jack",
				lastname: "Reginold",
			};

			expect(updatedState).toEqual(expected);
		});
	});
	describe("USER_LOGOUT action type", () => {
		it("clears all information in the character state", () => {
			// This action creator also performs a logout request to the server
			const previousState = {
				isAuth: true,
				id: "123",
				email: "no@gmail.com",
				name: "Jack",
				lastname: "Reginold",
			};
			const action = {
				type: actionTypes.USER_LOGOUT,
			};

			const updatedState = userReducer(previousState, action);
			const expected = { isAuth: false };
			expect(updatedState).toEqual(expected);
		});
	});
	describe("GLOBAL_STATE_RESET action type", () => {
		it("clears all information in the redux state", () => {
			// This action creator is shared with all reducers
			const previousState = {
				isAuth: true,
				id: "123",
				email: "no@gmail.com",
				name: "Jack",
				lastname: "Reginold",
			};
			const action = {
				type: actionTypes.GLOBAL_STATE_RESET,
			};

			const updatedState = userReducer(previousState, action);
			const expected = { isAuth: false };
			expect(updatedState).toEqual(expected);
		});
	});
});
