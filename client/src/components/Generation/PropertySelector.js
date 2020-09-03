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
  let categoryHeader;
  if (property === "characterClass") {
    categoryHeader = "Class";
  } else {
    categoryHeader = capitalize(property);
  }

  return (
    <Accordion data-test={`${value}-settings`}>
      <AccordionSummary data-test={`${value}-settings-header`}>
        <h3>{categoryHeader}</h3>
        <h1 data-test={`current${value}`}>{capitalize(value)}</h1>
      </AccordionSummary>
      <AccordionDetails data-test={`${value}-settings-interface`}>
        <FormControl>
          <Select
            onChange={handleChangeFor(`${property}`)}
            data-test={`${value}-select`}
            value={value}
          >
            {resource.map((itemValue, i) => {
              return (
                <MenuItem key={i} value={itemValue}>
                  {capitalize(itemValue)}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
}
