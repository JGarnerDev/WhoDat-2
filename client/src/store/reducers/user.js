export default function (state = { isAuth: false }, action) {
	switch (action.type) {
		case "USER_REGISTER":
			return {
				...state,
				register: action.payload.data.success,
				message: action.payload.data.message || "",
			};
		case "USER_UPDATE":
			return { ...state, user: action.payload };
		case "USER_DELETE":
			return {};
		case "USER_AUTH":
			return { ...state, ...action.payload };
		case "USER_LOGIN":
			return { ...state, ...action.payload };
		case "USER_LOGOUT":
			return { isAuth: false };
		case "RESET":
			return { isAuth: false };
		default:
			return state;
	}
}
