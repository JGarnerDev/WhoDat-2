export default function (state = {}, action) {
	switch (action.type) {
		case "CHARACTER_SAVE":
			return { ...state, saved: action.payload };
		case "CHARACTER_UPDATE":
			return { ...state, updated: action.payload };
		case "CHARACTER_DELETE":
			if (action.payload.success === true) {
				return { deleted: action.payload };
			}
			return { ...state, deleted: action.payload };

		case "CHARACTER_STATE_RESET":
			return {};
		case "GLOBAL_STATE_RESET":
			return {};
		default:
			return state;
	}
}
