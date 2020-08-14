export default function (state = {}, action) {
	switch (action.type) {
		case "SET_VIEW":
			return { ...state, current: action.payload };
		case "USER_GET":
			return { ...state, user: action.payload };
		case "CHARACTER_GET":
			return { ...state, character: action.payload };
		case "RESET":
			return { current: "Home" };
		default:
			return state;
	}
}
