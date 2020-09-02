import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { generateName, getRandomFromArr } from "../../utils";

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

class CreateCharacter extends Component {
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
				>
					Full randomization
				</button>
				<form onSubmit={this.submitForm}>
					<Accordion>
						<AccordionSummary>
							<h3>Name</h3>
							<h1>{this.state.name}</h1>
						</AccordionSummary>
						<AccordionDetails>
							{" "}
							<TextField
								type="text"
								name="name"
								placeholder="Enter Character Name"
								value={this.state.name}
								onChange={this.handleChangeFor("name")}
							/>{" "}
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
									/>
								</RadioGroup>
							</FormControl>
							<FormControl>
								<InputLabel>Racial Nameset</InputLabel>
								<Select onChange={this.handleChangeFor("nameGroup")}>
									{races.map((race) => {
										const raceCapitalized =
											race.charAt(0).toUpperCase() + race.slice(1);
										return <MenuItem value={race}>{raceCapitalized}</MenuItem>;
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
							>
								Generate random name
							</button>
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary>
							<h3>Race</h3>
							<h1>
								{this.state.race.charAt(0).toUpperCase() +
									this.state.race.slice(1)}
							</h1>
						</AccordionSummary>
						<AccordionDetails>
							<FormControl>
								<Select onChange={this.handleChangeFor("race")}>
									{races.map((race) => {
										const raceCapitalized =
											race.charAt(0).toUpperCase() + race.slice(1);
										return <MenuItem value={race}>{raceCapitalized}</MenuItem>;
									})}
								</Select>
							</FormControl>
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary>
							<h3>Class</h3>
							<h1>
								{this.state.class.charAt(0).toUpperCase() +
									this.state.class.slice(1)}
							</h1>
						</AccordionSummary>
						<AccordionDetails>
							<FormControl>
								<Select onChange={this.handleChangeFor("class")}>
									{characterClasses.map((characterClass) => {
										const characterClassCapitalized =
											characterClass.charAt(0).toUpperCase() +
											characterClass.slice(1);
										return (
											<MenuItem value={characterClass}>
												{characterClassCapitalized}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary>
							<h3>Background</h3>
							<h1>
								{this.state.background.charAt(0).toUpperCase() +
									this.state.background.slice(1)}
							</h1>
						</AccordionSummary>
						<AccordionDetails>
							<FormControl>
								<Select onChange={this.handleChangeFor("background")}>
									{backgrounds.map((background) => {
										const backgroundCapitalized =
											background.charAt(0).toUpperCase() + background.slice(1);
										return (
											<MenuItem value={background}>
												{backgroundCapitalized}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</AccordionDetails>
					</Accordion>
					<button
						onClick={() => {
							this.submitForm();
						}}
					>
						Generate Character!
					</button>
				</form>
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
