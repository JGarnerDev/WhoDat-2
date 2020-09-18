import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { generateName, getRandomFromArr } from "../../utils";

import { races, characterClasses, backgrounds } from "../../resources";

import NameGenerator from "../../components/Generation/NameGenerator";

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

	generateRandomAll = () => {
		const race = getRandomFromArr(races);
		const characterClass = getRandomFromArr(characterClasses);
		const background = getRandomFromArr(backgrounds);

		this.setState({
			name: generateName(this.state.nameGroup, this.state.nameStyle),
			race,
			characterClass,
			background,
		});
	};

	handleChangeFor = (propertyName) => (event) => {
		this.setState({ [propertyName]: event.target.value });
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

	generateNameWithSettings = (
		nameGroup = this.state.nameGroup,
		nameStyle = this.state.nameStyle,
		name = generateName(nameGroup, nameStyle)
	) => {
		this.setState({
			nameGroup,
			nameStyle,
			name,
		});
	};

	render() {
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
					<NameGenerator
						{...this.state}
						generateNameWithSettings={this.generateNameWithSettings}
						handleChangeFor={this.handleChangeFor}
						data-test="name-settings"
					/>
					{/* Race Generator  */}
					{/* Class Generator  */}
					{/* Background Generator  */}
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
