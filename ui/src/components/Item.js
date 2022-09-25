import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export default function MultiActionAreaCard({
  title,
  variants,
  images,
  vendor,
  tags,
  product_type
}, index) {

  let product_image = ""
  if(images.length === [] || images[0] === undefined){product_image = "none"}
  else{product_image = images[0]["src"]}
  

  return (
    // You can parameterize the "xs" to have a variable size
    <Grid key={index} item xs={2}>
      <Card sx={{ maxWidth: 250 }} style={{ boxShadow: "none" }}>
        <CardActionArea>
          <CardMedia component="img" image={product_image} alt="Uh-oh" />
        </CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="body2"
            color="GrayText"
            align="center"
            component="div"
          >
            {title}
          </Typography>
          <Typography variant="h6" align="center">
            {variants[0]["price"]}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
