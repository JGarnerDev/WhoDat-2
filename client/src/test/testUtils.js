import checkPropTypes from "check-prop-types";
import { createStore } from "redux";
import rootReducer from "../store/reducers";

export function createTestStore(initialState) {
	return createStore(rootReducer, initialState);
}

export function findByTestAttr(wrapper, val) {
	return wrapper.find(`[data-test="${val}"]`);
}
export function diveTwiceIn(component) {
	return component.dive().dive();
}

export function checkProps(component, conformingProps) {
	const propError = checkPropTypes(
		component.propTypes,
		conformingProps,
		"prop",
		component.name
	);

	expect(propError).toBeUndefined();
	return propError;
}
