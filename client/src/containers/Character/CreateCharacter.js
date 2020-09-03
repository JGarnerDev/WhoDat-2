import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { generateName, getRandomFromArr, capitalize } from "../../utils";

import { races, characterClasses, backgrounds } from "../../resources";

import TextField from "@material-ui/core/TextField";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export class CreateCharacter extends Component {
	state = {
		name: generateName(),
		race: getRandomFromArr(races),
		characterClass: getRandomFromArr(characterClasses),
		background: getRandomFromArr(backgrounds),

		nameStyle: "any",
		nameGroup: "any",
	};

	componentDidMount() {
		this.generateRandomAll();
	}

	handleChangeFor = (propertyName) => (event) => {
		this.setState({ [propertyName]: event.target.value });
	};

	generateCharacter = (character) => {
		console.log(character);
	};

	submitForm = (event) => {
		event.preventDefault();

		const state = this.state;

		const character = {
			name: state.name,
			race: state.race,
			characterClass: state.class,
			backgrounds: state.background,
		};

		this.generateCharacter(character);
	};

	generateRandomAll = () => {
		this.setState({
			name: generateName(this.state.nameGroup, this.state.nameStyle),
			race: getRandomFromArr(races),
			characterClass: getRandomFromArr(characterClasses),
			background: getRandomFromArr(backgrounds),
		});
	};

	generateNameWithSettings = (
		nameGroup = this.state.nameGroup,
		nameStyle = this.state.nameStyle
	) => {
		this.setState({
			nameGroup,
			nameStyle,
		});
		this.setState({
			name: generateName(nameGroup, nameStyle),
		});
	};

	render() {
		const { name, nameGroup, race, characterClass, background } = this.state;

		return (
			<div id="CreateCharacter" data-test="component-create">
				<button
					onClick={() => {
						this.generateRandomAll();
					}}
					data-test="button-randomizeCharacter"
				>
					Randomize
				</button>
				<form onSubmit={this.submitForm} data-test="form-characterCriteria">
					<Accordion data-test="name-settings">
						<AccordionSummary data-test="name-settings-header">
							<h3>Name</h3>
							<h1 data-test="currentName">{name}</h1>
						</AccordionSummary>
						<AccordionDetails data-test="name-settings-interface">
							<TextField
								type="text"
								name="name"
								placeholder="Enter Character Name"
								value={name}
								onChange={this.handleChangeFor("name")}
								data-test="name-settings-textfield"
							/>
							<FormControl component="fieldset">
								Name Style
								<RadioGroup
									row
									aria-label="position"
									name="position"
									defaultValue="top"
								>
									<FormControlLabel
										value="male"
										control={<Radio color="primary" />}
										label="Masculine"
										labelPlacement="top"
										onClick={() => {
											this.generateNameWithSettings(nameGroup, "male");
										}}
										data-test="radio-male"
									/>
									<FormControlLabel
										value="female"
										control={<Radio color="primary" />}
										label="Feminine"
										labelPlacement="top"
										onClick={() => {
											this.generateNameWithSettings(nameGroup, "female");
										}}
										data-test="radio-female"
									/>
									<FormControlLabel
										value="any"
										control={<Radio color="primary" />}
										label="Any"
										labelPlacement="top"
										onClick={() => {
											this.generateNameWithSettings(nameGroup);
										}}
										data-test="radio-any"
									/>
								</RadioGroup>
							</FormControl>
							<FormControl>
								<InputLabel>Racial Nameset</InputLabel>
								<Select
									onChange={this.handleChangeFor("nameGroup")}
									data-test="nameGroup-select"
									value={nameGroup}
								>
									{races.map((race, i) => {
										return (
											<MenuItem
												key={i}
												value={race}
												onClick={() => this.generateNameWithSettings(race)}
											>
												{capitalize(race)}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
							<button
								type="button"
								onClick={() => {
									this.generateNameWithSettings();
								}}
								data-test="name-generate"
							>
								Generate random name
							</button>
						</AccordionDetails>
					</Accordion>
					<Accordion data-test="race-settings">
						<AccordionSummary data-test="race-settings-header">
							<h3>Race</h3>
							<h1 data-test="currentRace">{capitalize(race)}</h1>
						</AccordionSummary>
						<AccordionDetails data-test="race-settings-interface">
							<FormControl>
								<Select
									onChange={this.handleChangeFor("race")}
									data-test="race-select"
									value={race}
								>
									{races.map((race, i) => {
										const raceCapitalized =
											race.charAt(0).toUpperCase() + race.slice(1);
										return (
											<MenuItem key={i} value={race}>
												{raceCapitalized}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</AccordionDetails>
					</Accordion>
					<Accordion data-test="class-settings">
						<AccordionSummary data-test="class-settings-header">
							<h3>Class</h3>
							<h1 data-test="currentClass">{capitalize(characterClass)}</h1>
						</AccordionSummary>
						<AccordionDetails data-test="class-settings-interface">
							<FormControl>
								<Select
									onChange={this.handleChangeFor("class")}
									data-test="class-select"
									value={characterClass}
								>
									{characterClasses.map((characterClass, i) => {
										const characterClassCapitalized =
											characterClass.charAt(0).toUpperCase() +
											characterClass.slice(1);
										return (
											<MenuItem key={i} value={characterClass}>
												{characterClassCapitalized}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</AccordionDetails>
					</Accordion>
					<Accordion data-test="background-settings">
						<AccordionSummary data-test="background-settings-header">
							<h3>Background</h3>
							<h1 data-test="currentBackground">{capitalize(background)}</h1>
						</AccordionSummary>
						<AccordionDetails data-test="background-settings-interface">
							<FormControl>
								<Select
									onChange={this.handleChangeFor("background")}
									data-test="background-select"
									value={background}
								>
									{backgrounds.map((background, i) => {
										const backgroundCapitalized =
											background.charAt(0).toUpperCase() + background.slice(1);
										return (
											<MenuItem key={i} value={background}>
												{backgroundCapitalized}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</AccordionDetails>
					</Accordion>
				</form>
				<button
					onClick={() => {
						this.submitForm();
					}}
				>
					Generate Character!
				</button>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCharacter);
