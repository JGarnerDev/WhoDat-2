import React from "react";

import { shallow } from "enzyme";

import { findByTestAttr } from "../testUtils";

import LoginContainer from "../../containers/Login_Container";

function setup() {
	return shallow(<LoginContainer />);
}

describe.skip("Login container", () => {});
