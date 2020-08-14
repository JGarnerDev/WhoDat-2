import React from "react";

import { shallow } from "enzyme";

import { findByTestAttr } from "../testUtils";

import AppContainer from "../../containers/App_Container";

function setup() {
	return shallow(<AppContainer />);
}

describe.skip("App container", () => {});
