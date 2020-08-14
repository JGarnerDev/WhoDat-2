import React from "react";

import { shallow } from "enzyme";

import { findByTestAttr } from "../testUtils";

import UserCharacters from "../../containers/UserCharacters_Container";

function setup() {
	return shallow(<UserCharacters />);
}

describe.skip("UserCharacters container", () => {});
