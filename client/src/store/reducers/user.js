export default function (
	state = {
		isAuth: false,
		logout: false,
		welcomeNotified: 0,
		goodbyeNotified: 0,
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
			if (action.payload.data.userData) {
				updatedUser = action.payload.data.userData;
				delete updatedUser.token;
				delete updatedUser.password;
			}
			return {
				...state,
				...updatedUser,
				updated: {
					success: action.payload.data.success,
					message: action.payload.data.message,
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
				welcomeNotified: 0,
				goodbyeNotified: 0,
			};
		case "USER_LOGOUT":
			return {
				isAuth: false,
				logout: true,
				welcomeNotified: 0,
				goodbyeNotified: 0,
			};
		case "USER_WELCOME_NOTIFY":
			return { ...state, welcomeNotified: state.welcomeNotified + 1 };
		case "USER_GOODBYE_NOTIFY":
			return { ...state, goodbyeNotified: state.goodbyeNotified + 1 };
		case "GLOBAL_STATE_RESET":
			return {
				isAuth: false,
				logout: false,
				welcomeNotified: 0,
				goodbyeNotified: 0,
			};
		default:
			return state;
	}
}
