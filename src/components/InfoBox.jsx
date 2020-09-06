import React from "react";
import "../Style/InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({
  title,
  cases,
  isRed,
  isGreen,
  isLightRed,
  active,
  total,
  ...props
}) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      } ${isLightRed && "infoBox--lightRed"}`}
    >
      <CardContent>
        <Typography className="infoBox_title" color="textSecondary">
          {title}
        </Typography>
        <h2 className={`infoBox_cases ${isGreen && "infoBox__cases--green"}`}>
          {cases}
        </h2>
        <Typography className="infoBox_total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
