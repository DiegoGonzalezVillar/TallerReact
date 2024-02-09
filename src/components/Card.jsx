import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from "@mui/material";

const CardComponent = (props) => {
  const { imagenHome, alt, text } = props;
  return (
    <Card>
      <CardMedia component="img" image={imagenHome} alt={alt} />
      <Typography className="texto2">{text}</Typography>
    </Card>
  );
};

export default CardComponent;
