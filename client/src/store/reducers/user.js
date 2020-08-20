export default function (state = { isAuth: false }, action) {
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
			return { ...state, ...action.payload };
		case "USER_DELETE":
			return {};
		case "USER_AUTH":
			return { ...state, ...action.payload };
		case "USER_LOGIN":
			return { ...action.payload };
		case "USER_LOGOUT":
			return { isAuth: false };
		case "GLOBAL_STATE_RESET":
			return { isAuth: false };
		default:
			return state;
	}
}
