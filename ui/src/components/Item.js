import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";

export default function MultiActionAreaCard({
  title,
  handle,
  variants,
  images,
  vendor,
  product_type,
  url
}, index) {

  let product_image = ""
  if(images.length === [] || images[0] === undefined){product_image = "none"}
  else{product_image = images[0]["src"]}
  
  return (
    // You can parameterize the "xs" to have a variable size
    <Grid key={index} item xs={1} >
      <Card sx={{ maxWidth: 250 }} style={{ boxShadow: "none" }}>
        <CardActionArea href={`${url}/products/${handle}?variant=${variants[0]['id']}`}>
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
