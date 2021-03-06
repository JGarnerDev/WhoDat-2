import React from "react";
// we need character class summaries
import { characterClasses, characterClassSummaries } from "../../resources";
import { capitalize, getRandomFromArr } from "../../utils";

import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
} from "@material-ui/core/";

export default function CharacterClassGenerator() {
	return (
		<Accordion>
			<AccordionSummary></AccordionSummary>
			<AccordionDetails></AccordionDetails>
		</Accordion>
	);
}
