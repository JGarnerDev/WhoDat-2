export default function (
	state = {
		isAuth: false,
		logout: false,
		notifications: { welcome: 0, goodbye: 0 },
	},
	action
) {
	switch (action.type) {
		case "USER_REGISTER":
			let user;
			if (action.payload.data.success) {
				user = action.payload.data.user;
				delete user.password;
			}
			return {
				...state,
				...user,
				isAuth: action.payload.data.success,
				message: action.payload.data.message,
			};
		case "USER_AUTH":
			return { ...state, ...action.payload };
		case "USER_LOGIN":
			return {
				...state,
				...action.payload,
				message: action.payload.message,
			};
		case "USER_LOGOUT":
			return {
				isAuth: false,
				logout: true,
				notifications: { welcome: 0, goodbye: 0 },
			};
		case "USER_WELCOME_NOTIFY":
			return {
				...state,
				notifications: {
					welcome: state.notifications.welcome + 1,
					goodbye: state.notifications.goodbye,
				},
			};
		case "USER_GOODBYE_NOTIFY":
			return {
				...state,
				notifications: {
					welcome: state.notifications.welcome,
					goodbye: state.notifications.goodbye + 1,
				},
			};
		case "GLOBAL_STATE_RESET":
			return {
				isAuth: false,
				logout: false,
				notifications: { welcome: 0, goodbye: 0 },
			};
		default:
			return state;
	}
}
