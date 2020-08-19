export default function (state = {}, action) {
	switch (action.type) {
		case "SET_VIEW":
			return { ...state, current: action.payload };
		case "USER_GET":
			return { ...state, user: action.payload };
		case "CHARACTER_GET":
			return { ...state, character: action.payload };
		case "GLOBAL_STATE_RESET":
			return { current: "home" };
		default:
			return state;
	}
}
