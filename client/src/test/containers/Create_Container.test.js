import React from "react";

import { shallow } from "enzyme";

import { findByTestAttr } from "../testUtils";

import CreateContainer from "../../containers/Create_Container";

function setup() {
	return shallow(<CreateContainer />);
}

describe.skip("Create container", () => {});
