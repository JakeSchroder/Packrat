import * as React from 'react';
import { Card, CardContent, CardMedia, CardActionArea, CardActions, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export default function MultiActionAreaCard({ name, price, img, type, index }) {
  return (
    //* Replace key with key in shopify DB *//
    // You can parameterize the "xs" to have a variable size
    <Grid key={index} item xs={2}>  
      <Card sx={{ maxWidth: 250 }} style={{ boxShadow: "none" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={img}
          />

        </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="body2" color="GrayText" align="center" component="div">
            {name}
          </Typography>
          <Typography variant="h6" align="center">
            {price}
          </Typography>
        </CardContent>
      </Card>
    </Grid>

  );
}
