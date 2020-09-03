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
		name: "",
		race: "",
		class: "",
		background: "",

		nameStyle: null,
		nameGroup: null,
	};

	handleChangeFor = (propertyName) => (event) => {
		this.setState({ [propertyName]: event.target.value });
	};

	submitForm = (event) => {
		event.preventDefault();

		setTimeout(() => {
			this.setState({ isSubmitted: true });
		}, 200);

		setTimeout(() => {
			this.setState({ isSubmitted: false });
			this.props.user.message = "";
		}, 2000);
	};

	render() {
		return (
			<div id="CreateCharacter" data-test="component-create">
				<button
					onClick={() => {
						this.setState({
							name: generateName(),
							race: getRandomFromArr(races),
							class: getRandomFromArr(characterClasses),
							background: getRandomFromArr(backgrounds),
						});
					}}
					data-test="button-randomizeCharacter"
				>
					Full randomization
				</button>
				<form onSubmit={this.submitForm} data-test="form-characterCriteria">
					<Accordion data-test="name-settings">
						<AccordionSummary data-test="name-settings-header">
							<h3>Name</h3>
							<h1 data-test="currentName">{this.state.name}</h1>
						</AccordionSummary>
						<AccordionDetails data-test="name-settings-interface">
							<TextField
								type="text"
								name="name"
								placeholder="Enter Character Name"
								value={this.state.name}
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
										onClick={() =>
											this.setState({
												nameStyle: "male",
											})
										}
										data-test="radio-male"
									/>
									<FormControlLabel
										value="female"
										control={<Radio color="primary" />}
										label="Feminine"
										labelPlacement="top"
										onClick={() =>
											this.setState({
												nameStyle: "female",
											})
										}
										data-test="radio-female"
									/>
									<FormControlLabel
										value="any"
										control={<Radio color="primary" />}
										label="Any"
										labelPlacement="top"
										onClick={() =>
											this.setState({
												nameStyle: null,
											})
										}
										data-test="radio-any"
									/>
								</RadioGroup>
							</FormControl>
							<FormControl>
								<InputLabel>Racial Nameset</InputLabel>
								<Select
									onChange={this.handleChangeFor("nameGroup")}
									data-test="nameGroup-select"
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
							<button
								type="button"
								onClick={() => {
									this.setState({
										name: generateName(
											this.state.nameGroup,
											this.state.nameStyle
										),
									});
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
							<h1 data-test="currentRace">{capitalize(this.state.race)}</h1>
						</AccordionSummary>
						<AccordionDetails data-test="race-settings-interface">
							<FormControl>
								<Select
									onChange={this.handleChangeFor("race")}
									data-test="race-select"
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
							<h1 data-test="currentClass">{capitalize(this.state.class)}</h1>
						</AccordionSummary>
						<AccordionDetails data-test="class-settings-interface">
							<FormControl>
								<Select onChange={this.handleChangeFor("class")} data-test="class-select">
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
							<h1 data-test="currentBackground">
								{capitalize(this.state.background)}
							</h1>
						</AccordionSummary>
						<AccordionDetails data-test="background-settings-interface">
							<FormControl>
								<Select onChange={this.handleChangeFor("background")} data-test="background-select">
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
