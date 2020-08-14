import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";
import promiseMiddleware from "redux-promise";

import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	reducers,
	composeEnhancers(applyMiddleware(promiseMiddleware))
);

export const persistor = persistStore(store);

export default { store, persistor };
