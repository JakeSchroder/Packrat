import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

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
