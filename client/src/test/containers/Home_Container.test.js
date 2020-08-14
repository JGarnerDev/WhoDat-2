import React from "react";

import { shallow } from "enzyme";

import { findByTestAttr } from "../testUtils";

import HomeContainer from "../../containers/Home_Container";

function setup() {
	return shallow(<HomeContainer />);
}

describe.skip("Home container", () => {});
