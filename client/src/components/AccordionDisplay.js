import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";

export default function AccordionDisplay({ details, summary }) {
	return (
		<Accordion data-test="component-accordion">
			<AccordionSummary data-test="accordian-summary">
				{summary}
			</AccordionSummary>
			<AccordionDetails data-test="accordian-details">
				{details}
			</AccordionDetails>
		</Accordion>
	);
}
