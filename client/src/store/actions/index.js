import axios from "axios";

// Action type strings set up here so future changes are made
// without touching action creators.

export const actionTypes = {
	// Views (view reducer)

	SET_VIEW: "SET_VIEW",
	USER_GET: "USER_GET",
	CHARACTER_GET: "CHARACTER_GET",

	// Archives (list reducer)

	USERS_GET_LIST: "USERS_GET_LIST",
	CHARACTERS_GET_LIST: "CHARACTERS_GET_LIST",
	CHARACTERS_GET_BY_AUTHOR: "CHARACTERS_GET_BY_AUTHOR",

	// User CRUD & Admin (user reducer)

	USER_REGISTER: "USER_REGISTER",
	USER_UPDATE: "USER_UPDATE",
	USER_DELETE: "USER_DELETE",
	USER_AUTH: "USER_AUTH",
	USER_LOGIN: "USER_LOGIN",
	USER_LOGOUT: "USER_LOGOUT",

	// Character CRUD (chracter reducer)

	CHARACTER_SAVE: "CHARACTER_SAVE",
	CHARACTER_UPDATE: "CHARACTER_UPDATE",
	CHARACTER_DELETE: "CHARACTER_DELETE",

	// Resetting Redux State

	RESET: "RESET",
};

// Views (view reducer)

export function setView(view) {
	return {
		type: actionTypes.SET_VIEW,
		payload: view,
	};
}

export function getUserById(id) {
	const request = axios
		.get("/api/user", { _id: id })
		.then((response) => response.data);

	return {
		type: actionTypes.USER_GET,
		payload: request,
	};
}

export function getCharacterById(id) {
	const request = axios
		.get("/api/character", { _id: id })
		.then((response) => response.data);
	return {
		type: actionTypes.CHARACTER_GET,
		payload: request,
	};
}

// Archives (list reducer)

export function getUserList(skip = 0, limit = 30, order = -1) {
	const request = axios
		.get("/api/users", { skip, limit, order })
		.then((response) => response.data);
	return {
		type: actionTypes.USERS_GET_LIST,
		payload: request,
	};
}

export function getCharactersList(skip = 0, limit = 30, order = -1) {
	const request = axios
		.get("/api/users", { skip, limit, order })
		.then((response) => response.data);
	return {
		type: actionTypes.CHARACTERS_GET_LIST,
		payload: request,
	};
}

export function getCharactersByAuthorId(id) {
	const request = axios
		.get("/api/characters_user_get", { authorId: id })
		.then((response) => response.data);
	return {
		type: actionTypes.CHARACTERS_GET_BY_AUTHOR,
		payload: request,
	};
}

// User CRUD & Admin (user reducer)

export function registerUser(user) {
	const request = axios.post("/api/register", user);

	return {
		type: actionTypes.USER_REGISTER,
		payload: request,
	};
}

export function updateUser(updatedUserData) {
	const request = axios.post("/api/user_update", updatedUserData);
	return {
		type: actionTypes.USER_UPDATE,
		payload: request.success,
	};
}

export function deleteUserById(id) {
	const request = axios.delete("/api/user_delete", { _id: id });
	return {
		type: actionTypes.USER_DELETE,
		payload: request.success,
	};
}

export function auth() {
	const request = axios.get("/api/auth").then((response) => response.data);

	return {
		type: actionTypes.USER_AUTH,
		payload: request,
	};
}

export function logUserIn({ email, password }) {
	const request = axios
		.post("/api/login", { email, password })
		.then((response) => response.data);

	return {
		type: actionTypes.USER_LOGIN,
		payload: request,
	};
}

export function logUserOut() {
	axios.get("/api/logout");
	return {
		type: actionTypes.USER_LOGOUT,
		payload: "Goodbye!",
	};
}

// Character CRUD (chracter reducer)

export function saveCharacter(character) {
	const request = axios
		.post("/api/character", character)
		.then((response) => response.data);
	return {
		type: actionTypes.CHARACTER_SAVE,
		payload: request,
	};
}

export function updateCharacter(character) {
	const request = axios
		.post("/api/character_update", character)
		.then((response) => response.data);
	return {
		type: actionTypes.CHARACTER_UPDATE,
		payload: request,
	};
}

export function deleteCharacterById(id) {
	const request = axios
		.delete("/api/character_delete", { _id: id })
		.then((response) => response.data);
	return {
		type: actionTypes.CHARACTER_DELETE,
		payload: request,
	};
}

export function reset() {
	return {
		type: actionTypes.RESET,
	};
}
