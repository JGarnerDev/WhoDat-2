import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import { generateName, getRandomFromArr } from "../../utils";

import { races, characterClasses, backgrounds } from "../../resources";

import NameGenerator from "../../components/Generation/NameGenerator";
import PropertySelector from "../../components/Generation/PropertySelector";

export class CreateCharacter extends Component {
  state = {
    name: generateName(),
    race: getRandomFromArr(races),
    characterClass: getRandomFromArr(characterClasses),
    background: getRandomFromArr(backgrounds),
    raceData: "",
    nameStyle: "any",
    nameGroup: "any",
  };

  componentDidMount() {
    this.generateRandomAll();
    this.getRaceData();
    this.getCharacterClassData();
    // The API doesn't serve character background information, unfortunately :(
  }

  generateRandomAll = () => {
    this.setState({
      name: generateName(this.state.nameGroup, this.state.nameStyle),
      race: getRandomFromArr(races),
      characterClass: getRandomFromArr(characterClasses),
      background: getRandomFromArr(backgrounds),
    });
    this.setState({
      raceData: this.getRaceData(),
      characterClassData: this.getCharacterClassData()
    })
  };

  getRaceData = () => {
    return axios
      .get(`https://www.dnd5eapi.co/api/races/${this.state.race}`)
      .then((response) => {
        this.setState({ raceData: response.data });
      });
  };
  getCharacterClassData = () => {
    return axios
      .get(`https://www.dnd5eapi.co/api/classes/${this.state.characterClass}`)
      .then((response) => {
        this.setState({ characterClassData: response.data });
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

  properties = [
    { name: "race", resource: races, apiData: "raceData" },
    {
      name: "characterClass",
      resource: characterClasses,
      apiData: "characterClassData",
    },
    {
      name: "background",
      resource: backgrounds,
    },
  ];

  renderPropertySettings = () => {
    return this.properties.map((property, i) => (
      <PropertySelector
        property={`${property.name}`}
        value={this.state[property.name]}
        resource={property.resource}
        details={this.state[property.apiData]}
        handleChangeFor={this.handleChangeFor}
        data-test={`${property.name}-settings`}
        key={i}
      />
    ));
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
          {this.renderPropertySettings()}
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
