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
  _id,
  title,
  vendor,
  variants,
  images,
}) {
  const tmp =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6VU8se8Wms7XKJu19YWGWyFD3C1A9UgnU2A&usqp=CAU";
  return (
    //* Replace key with key in shopify DB *//
    // You can parameterize the "xs" to have a variable size
    <Grid key={_id} item xs={2}>
      <Card sx={{ maxWidth: 250 }} style={{ boxShadow: "none" }}>
        <CardActionArea>
          <CardMedia component="img" image={images[0]["src"]} />
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
