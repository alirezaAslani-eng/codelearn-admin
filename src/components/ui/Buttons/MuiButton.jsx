import { Button } from "@mui/material";
import React from "react";

export default function MuiButton(props) {
  return (
    <Button {...props} sx={{ fontFamily: "dana-md" }}>
      {props.children}
    </Button>
  );
}
