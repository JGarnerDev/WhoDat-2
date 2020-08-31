import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import view from "./view";

import user from "./user";

const persistConfig = {
	key: "root",
	storage,
	// Persists the states in Store by listing their name-strings
	whitelist: ["user", "view"],
};

const rootReducer = combineReducers({
	view,

	user,
});

export default persistReducer(persistConfig, rootReducer);
