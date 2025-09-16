import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./customMui.css";
export default function AccordionUsage({
  children,
  title,
  className = "",
}) {
  const [isOpen, setIsOpen] = React.useState(false); // trun Accordion to a controled Accordion !
  return (
    <Accordion
      onChange={() => setIsOpen((prev) => !prev)}
      expanded={isOpen}
      className={`secondary_box_color ${className}`}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className="secondary_text_color" />}
        aria-controls="panel3-content"
        id="panel3-header"
      >
        <span className="font-dana-md secondary_text_color">{title}</span>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}