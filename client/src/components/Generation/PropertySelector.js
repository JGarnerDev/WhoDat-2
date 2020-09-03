import React from "react";

import { capitalize } from "../../utils";

import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	FormControl,
	MenuItem,
	Select,
} from "@material-ui/core/";

export default function PropertySelector({
	property,
	value,
	resource,
	handleChangeFor,
}) {
	return (
		<Accordion data-test={`${value}-settings`}>
			<AccordionSummary data-test={`${value}-settings-header`}>
				<h3>{capitalize(property)}</h3>
				<h1 data-test={`current${value}`}>{capitalize(value)}</h1>
			</AccordionSummary>
			<AccordionDetails data-test={`${value}-settings-interface`}>
				<FormControl>
					<Select
						onChange={handleChangeFor(`${value}`)}
						data-test={`${value}-select`}
						value={value}
					>
						{resource.map((value, i) => {
							const valueCapitalized =
								value.charAt(0).toUpperCase() + value.slice(1);
							return (
								<MenuItem key={i} value={value}>
									{valueCapitalized}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
			</AccordionDetails>
		</Accordion>
	);
}
