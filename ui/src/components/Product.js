import * as React from 'react';
import { Card, CardContent, CardMedia, CardActionArea, CardActions, Button, Typography} from '@mui/material';

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={require("../img/product/jewelery/TV_PearlNecklace.png")}
        />

      </CardActionArea>
      <CardContent>
          <Typography gutterBottom variant="body2" color="GrayText" align="center" component="div">
            Save the Planet Triple-Layer Beaded Necklace
          </Typography>
          <Typography variant="h6" align="center">
            $22.00
          </Typography>
        </CardContent>
    </Card>
  );
}
