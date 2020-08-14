export default function (state = {}, action) {
	switch (action.type) {
		case "CHARACTER_SAVE":
			return { ...state, saved: action.payload };
		case "CHARACTER_UPDATE":
			return { ...state, updated: action.payload };
		case "CHARACTER_DELETE":
			return {};
		case "RESET":
			return {};

		default:
			return state;
	}
}
