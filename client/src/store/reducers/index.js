import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import view from "./view";
import list from "./list";
import user from "./user";
import character from "./character";

const persistConfig = {
	key: "root",
	storage,
	// Persists the states in Store by listing their name-strings
	whitelist: ["user", "view", "list", "character"],
};

const rootReducer = combineReducers({ view, list, user, character });

export default persistReducer(persistConfig, rootReducer);
