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
  details,
  handleChangeFor,
}) {
  let categoryHeader;
  if (property === "characterClass") {
    categoryHeader = "Class";
  } else {
    categoryHeader = capitalize(property);
  }

  function renderDetails(details) {
    if (!details) {
      return;
    }
    if (details) {
      const detailHeaders = Object.keys(details);
      const detailContent = Object.values(details);
      return details
        ? detailHeaders.map((detailHeader, i) => (
            <div>
              <h1>{detailHeader}</h1>
              <p>{detailContent[i].toString()}</p>
            </div>
          ))
        : null;
    }
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
        <div>{renderDetails(details)}</div>
      </AccordionDetails>
    </Accordion>
  );
}
