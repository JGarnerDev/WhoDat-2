export default function (state = {}, action) {
	switch (action.type) {
		case "USERS_GET_LIST":
			return { ...state, users: action.payload };
		case "CHARACTERS_GET_LIST":
			return { ...state, characters: action.payload };
		case "CHARACTERS_GET_BY_AUTHOR":
			return { ...state, characters: action.payload };
		case "GLOBAL_STATE_RESET":
			return {};
		default:
			return state;
	}
}
