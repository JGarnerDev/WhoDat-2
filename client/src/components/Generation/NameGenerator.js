import React from "react";

import { races } from "../../resources";
import { capitalize } from "../../utils";

import {
	TextField,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio,
	InputLabel,
	MenuItem,
	Select,
} from "@material-ui/core/";

export default function NameGenerator({
	name,
	generateNameWithSettings,
	nameGroup,
	handleChangeFor,
}) {
	return (
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
					onChange={handleChangeFor("name")}
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
								generateNameWithSettings(nameGroup, "male");
							}}
							data-test="radio-male"
						/>
						<FormControlLabel
							value="female"
							control={<Radio color="primary" />}
							label="Feminine"
							labelPlacement="top"
							onClick={() => {
								generateNameWithSettings(nameGroup, "female");
							}}
							data-test="radio-female"
						/>
						<FormControlLabel
							value="any"
							control={<Radio color="primary" />}
							label="Any"
							labelPlacement="top"
							onClick={() => {
								generateNameWithSettings(nameGroup);
							}}
							data-test="radio-any"
						/>
					</RadioGroup>
				</FormControl>
				<FormControl>
					<InputLabel>Racial Nameset</InputLabel>
					<Select
						onChange={handleChangeFor("nameGroup")}
						data-test="nameGroup-select"
						value={nameGroup}
					>
						{races.map((race, i) => {
							return (
								<MenuItem
									key={i}
									value={race}
									onClick={() => generateNameWithSettings(race)}
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
						generateNameWithSettings();
					}}
					data-test="name-generate"
				>
					Generate random name
				</button>
			</AccordionDetails>
		</Accordion>
	);
}
