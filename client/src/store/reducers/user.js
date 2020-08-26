export default function (
	state = {
		isAuth: false,
		logout: false,
		notifications: { welcome: 0, goodbye: 0, errmessage: "" },
	},
	action
) {
	switch (action.type) {
		case "USER_REGISTER":
			let user;
			if (action.payload.data.doc) {
				user = action.payload.data.doc;
				delete user.password;
			}
			return {
				...state,
				register: {
					success: action.payload.data.success,
					message: action.payload.data.message || "",
				},
				isAuth: action.payload.data.success,
				...user,
			};
		case "USER_UPDATE":
			let updatedUser;
			if (action.payload.userData) {
				updatedUser = action.payload.userData;
				delete updatedUser.token;
				delete updatedUser.password;
				return {
					...state,
					...updatedUser,
					updated: {
						success: action.payload.success,
						message: action.payload.message,
					},
				};
			}
			return {
				...state,
				updated: {
					success: action.payload.success,
					message: action.payload.message,
				},
			};
		case "USER_DELETE":
			return {};
		case "USER_AUTH":
			return { ...state, ...action.payload };
		case "USER_LOGIN":
			return {
				...state,
				...action.payload,
			};
		case "USER_LOGOUT":
			return {
				isAuth: false,
				logout: true,
				notifications: { welcome: 0, goodbye: 0, errmessage: "" },
			};
		case "USER_WELCOME_NOTIFY":
			return { ...state, welcomeNotified: state.welcomeNotified + 1 };
		case "USER_GOODBYE_NOTIFY":
			return { ...state, goodbyeNotified: state.goodbyeNotified + 1 };
		case "GLOBAL_STATE_RESET":
			return {
				isAuth: false,
				logout: false,
				notifications: { welcome: 0, goodbye: 0, errmessage: "" },
			};
		default:
			return state;
	}
}
