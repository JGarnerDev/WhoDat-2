import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, createTestStore } from "../testUtils";

import { characterClasses, races, backgrounds } from "../../resources";
import { getRandomFromArr, capitalize } from "../../utils";

import { CreateCharacter } from "../../containers/Character/CreateCharacter";

const storeWithAuth = createTestStore({
	user: {
		isAuth: true,
		logout: false,
		notifications: { welcome: 0, goodbye: 0 },
	},
});
const storeWithoutAuth = createTestStore({
	user: {
		isAuth: false,
		logout: false,
		notifications: { welcome: 0, goodbye: 0 },
	},
});

const setupAuthCreateCharacter = () => {
	const component = shallow(<CreateCharacter store={storeWithAuth} />);
	return component;
};
const setupNotAuthCreateCharacter = () => {
	const component = shallow(<CreateCharacter store={storeWithoutAuth} />);
	return component;
};

const makeRandomString = () => {
	return [...Array(10)]
		.map((i) => (~~(Math.random() * 36)).toString(36))
		.join("");
};

describe("CreateCharacter container component", () => {
	describe("Sanity Tests", () => {
		it("has a module", () => {
			expect(CreateCharacter).toBeDefined();
		});
		it("renders without error when user is authorized", () => {
			const CreateCharacter = setupAuthCreateCharacter();
			const found = findByTestAttr(CreateCharacter, "component-create");
			expect(found.length).toBe(1);
		});
		it("renders without error when user is not authorized", () => {
			const CreateCharacter = setupNotAuthCreateCharacter();
			const found = findByTestAttr(CreateCharacter, "component-create");
			expect(found.length).toBe(1);
		});
	});
	describe("Rendering", () => {
		const authCreateCharacter = setupAuthCreateCharacter();
		const testState = {
			name: "Foo",
			race: "Elf",
			class: "Bard",
			background: "Soldier",
		};
		authCreateCharacter.setState(testState);

		it("renders the `Full Randomization` button", () => {
			const found = findByTestAttr(
				authCreateCharacter,
				"button-randomizeCharacter"
			);
			expect(found.length).toBe(1);
		});
		it("renders the character criteria form", () => {
			const found = findByTestAttr(
				authCreateCharacter,
				"form-characterCriteria"
			);
			expect(found.length).toBe(1);
		});
		describe("Character name settings", () => {
			it("renders the character name settings", () => {
				const found = findByTestAttr(authCreateCharacter, "name-settings");

				expect(found.length).toBe(1);
			});
			it("renders `Name` and the currently generated/specified character name in it's header", () => {
				const nameHeader = findByTestAttr(
					authCreateCharacter,
					"name-settings-header"
				);
				expect(nameHeader.length).toBe(1);

				const currentCharacterNameElement = findByTestAttr(
					nameHeader,
					"currentName"
				);

				expect(authCreateCharacter.state().name).toEqual(
					currentCharacterNameElement.text()
				);
			});
			it("renders the character name settings interface", () => {
				const found = findByTestAttr(
					authCreateCharacter,
					"name-settings-interface"
				);
				expect(found.length).toBe(1);
			});
		});
		describe("Character race settings", () => {
			it("renders the character race settings", () => {
				const found = findByTestAttr(authCreateCharacter, "race-settings");

				expect(found.length).toBe(1);
			});
			it("renders `race` and the currently generated/specified character race in it's header", () => {
				const raceHeader = findByTestAttr(
					authCreateCharacter,
					"race-settings-header"
				);
				expect(raceHeader.length).toBe(1);

				const currentCharacterRaceElement = findByTestAttr(
					raceHeader,
					"currentRace"
				);

				expect(authCreateCharacter.state().race).toEqual(
					currentCharacterRaceElement.text()
				);
			});
			it("renders the character race settings interface", () => {
				const found = findByTestAttr(
					authCreateCharacter,
					"race-settings-interface"
				);
				expect(found.length).toBe(1);
			});
		});
		describe("Character class settings", () => {
			it("renders the character class settings", () => {
				const found = findByTestAttr(authCreateCharacter, "class-settings");

				expect(found.length).toBe(1);
			});
			it("renders `class` and the currently generated/specified character class in it's header", () => {
				const classHeader = findByTestAttr(
					authCreateCharacter,
					"class-settings-header"
				);
				expect(classHeader.length).toBe(1);

				const currentCharacterClassElement = findByTestAttr(
					classHeader,
					"currentClass"
				);

				expect(capitalize(authCreateCharacter.state().characterClass)).toEqual(
					currentCharacterClassElement.text()
				);
			});
			it("renders the character class settings interface", () => {
				const found = findByTestAttr(
					authCreateCharacter,
					"class-settings-interface"
				);
				expect(found.length).toBe(1);
			});
		});
		describe("Character background settings", () => {
			it("renders the character background settings", () => {
				const found = findByTestAttr(
					authCreateCharacter,
					"background-settings"
				);

				expect(found.length).toBe(1);
			});
			it("renders `background` and the currently generated/specified character background in it's header", () => {
				const backgroundHeader = findByTestAttr(
					authCreateCharacter,
					"background-settings-header"
				);
				expect(backgroundHeader.length).toBe(1);

				const currentCharacterBackgroundElement = findByTestAttr(
					backgroundHeader,
					"currentBackground"
				);

				expect(authCreateCharacter.state().background).toEqual(
					currentCharacterBackgroundElement.text()
				);
			});
			it("renders the character background settings interface", () => {
				const found = findByTestAttr(
					authCreateCharacter,
					"background-settings-interface"
				);
				expect(found.length).toBe(1);
			});
		});
	});
	describe("State Management", () => {
		describe("`Full Randomization` button", () => {
			it("updates all character values in state when clicked with ones randomly picked in the app's resources", () => {
				const component = setupAuthCreateCharacter();
				const previousState = component.state();
				//
				const fullRandomBttn = findByTestAttr(
					component,
					"button-randomizeCharacter"
				);
				//
				fullRandomBttn.simulate("click");
				//
				const updatedState = component.state();
				//
				expect(previousState.name).not.toBe(updatedState.name);

				const wordsInName = updatedState.name.split(" ").length;
				expect(wordsInName).toBe(2);
				//
				expect(previousState).not.toEqual(updatedState);
				expect(races).toContain(updatedState.race);
				expect(characterClasses).toContain(updatedState.characterClass);
				expect(backgrounds).toContain(updatedState.background);
			});
		});
		describe("Character name settings", () => {
			it("updates the state with the value in the textfield", () => {
				const component = setupAuthCreateCharacter();
				const textField = findByTestAttr(component, "name-settings-textfield");
				const expected = makeRandomString();
				textField.simulate("change", { target: { value: expected } });
				const updatedState = component.state();

				expect(updatedState.name).toBe(expected);
			});
			it("updates the `nameStyle` state value correctly when radio elements are clicked", () => {
				const component = setupAuthCreateCharacter();
				const maleRadio = findByTestAttr(component, "radio-male");
				const femaleRadio = findByTestAttr(component, "radio-female");
				const anyRadio = findByTestAttr(component, "radio-any");
				maleRadio.simulate("click");
				const stateWithMaleNameStyle = component.state();
				femaleRadio.simulate("click");
				const stateWithFemaleNameStyle = component.state();
				anyRadio.simulate("click");
				const stateWithAnyNameStyle = component.state();

				expect(stateWithMaleNameStyle.nameStyle).toBe("male");
				expect(stateWithFemaleNameStyle.nameStyle).toBe("female");
				expect(["male", "female"]).toContain(stateWithAnyNameStyle.nameStyle);
			});
			it("updates the `nameGroup` state value correctly when a value is selected", () => {
				const component = setupAuthCreateCharacter();
				const maleRadio = findByTestAttr(component, "nameGroup-select");
				const race = getRandomFromArr(races);
				maleRadio.simulate("change", { target: { value: race } });
				const updatedState = component.state();
				expect(updatedState.nameGroup).toBe(race);
			});
			it("updates the `name` state value correctly when the `Generate random name` button is clicked", () => {
				const component = setupAuthCreateCharacter();
				const previousState = component.state();
				const generateNameButton = findByTestAttr(component, "name-generate");
				generateNameButton.simulate("click");
				const updatedState = component.state();

				expect(updatedState.name).not.toEqual(previousState.name);
				expect(updatedState).toEqual({
					...previousState,
					name: updatedState.name,
				});
			});
		});
		describe("Character race settings", () => {
			it("updates the `race` state property when a value is selected", () => {
				const component = setupAuthCreateCharacter();
				const previousState = component.state();
				const raceSelect = findByTestAttr(component, "race-select");
				const race = getRandomFromArr(races);
				raceSelect.simulate("change", { target: { value: race } });
				const updatedState = component.state();
				expect(previousState.race).not.toBe(updatedState.race);
				expect(races).toContain(updatedState.race);
			});
		});
		describe("Character class settings", () => {
			it("updates the `class` state property when a value is selected", () => {
				const component = setupAuthCreateCharacter();
				const previousState = component.state();
				const classSelect = findByTestAttr(component, "class-select");
				const characterClass = getRandomFromArr(characterClasses);
				classSelect.simulate("change", { target: { value: characterClass } });
				const updatedState = component.state();
				expect(previousState.class).not.toBe(updatedState.class);
				expect(characterClasses).toContain(updatedState.class);
			});
		});
		describe("Character background settings", () => {
			it("updates the `background` state property when a value is selected", () => {
				const component = setupAuthCreateCharacter();
				const previousState = component.state();
				const backgroundSelect = findByTestAttr(component, "background-select");
				const background = getRandomFromArr(backgrounds);
				backgroundSelect.simulate("change", { target: { value: background } });
				const updatedState = component.state();
				expect(previousState.background).not.toBe(updatedState.background);
				expect(backgrounds).toContain(updatedState.background);
			});
		});
	});
});
