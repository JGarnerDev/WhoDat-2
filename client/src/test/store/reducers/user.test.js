import { actionTypes } from "../../../store/actions/index";
import userReducer from "../../../store/reducers/user";

describe("User reducer", () => {
	// this reducer is responsible for handling the previousUser information (id, name, characters they author, etc.)

	describe("Sanity tests", () => {
		it("has a module", () => {
			expect(userReducer).toBeDefined();
		});
		it("returns default state `{ isAuth: false }` when no action type case is matched", () => {
			const defaultState = userReducer(undefined, {});
			const action = { type: actionTypes.FOO, payload: "BAR" };
			const updatedState = userReducer(defaultState, action);

			expect(updatedState).toEqual({
				isAuth: false,
				logout: false,
				notifications: { welcome: 0, goodbye: 0 },
			});
		});
	});

	describe("USER_REGISTER action type", () => {
		it("should only update register.success and register.message if registration fails", () => {
			const defaultState = userReducer(undefined, {});
			const action = {
				type: actionTypes.USER_REGISTER,
				payload: {
					data: {
						success: false,
						message: "A user with that email already exists!",
					},
				},
			};
			const updatedState = userReducer(defaultState, action);
			const expected = {
				isAuth: false,
				message: "A user with that email already exists!",
			};
			expect(updatedState).toEqual({ ...defaultState, ...expected });
		});
		it("should update the user state with names, email, role, id, and characters (empty array)", () => {
			const defaultState = userReducer(undefined, {});
			const user = {
				name: "foo",
				lastname: "bar",
				email: "m@m.com",
				_id: "123124",
			};
			const action = {
				type: actionTypes.USER_REGISTER,
				payload: {
					data: {
						success: true,
						user: user,
					},
				},
			};
			const updatedState = userReducer(defaultState, action);
			const expected = {
				isAuth: true,
				...user,
			};
			expect(updatedState).toEqual({ ...defaultState, ...expected });
		});
	});

	describe("USER_AUTH action type", () => {
		it("will update `user` value with the action payload when there is no previous value", () => {
			const defaultState = userReducer(undefined, {});
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

			const updatedState = userReducer(defaultState, action);
			const expected = {
				isAuth: true,
				id: "123",
				email: "no@gmail.com",
				name: "Jack",
				lastname: "Reginold",
			};
			expect(updatedState).toEqual({ ...defaultState, ...expected });
		});
	});
	describe("USER_LOGIN action type", () => {
		it("will update `user` value with the action payload when there is no previous value", () => {
			const defaultState = userReducer(undefined, {});
			const action = {
				type: actionTypes.USER_LOGIN,
				payload: {
					isAuth: true,
					id: "123",
					email: "no@gmail.com",
				},
			};

			const updatedState = userReducer(defaultState, action);
			const expected = {
				isAuth: true,
				id: "123",
				email: "no@gmail.com",
			};

			expect(updatedState).toEqual({ ...defaultState, ...expected });
		});
	});
	describe("USER_LOGOUT action type", () => {
		it("clears all information in the character state", () => {
			// This action creator also performs a logout request to the server
			const defaultState = userReducer(undefined, {});
			const previousState = {
				isAuth: true,
				id: "123",
				email: "no@gmail.com",
			};
			const action = {
				type: actionTypes.USER_LOGOUT,
			};

			const updatedState = userReducer(previousState, action);

			expect(updatedState).toEqual({ ...defaultState, logout: true });
		});
	});
	describe("GLOBAL_STATE_RESET action type", () => {
		it("clears all information in the redux state", () => {
			// This action creator is shared with all reducers
			const defaultState = userReducer(undefined, {});
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

			expect(updatedState).toEqual(defaultState);
		});
	});
});
