import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import ItemComponent from "../components/Item";
//TODO//
//* Make map function to add all products *//

export default function BasicGrid({ filterState, products }) {
  products = products.splice(0, 100);//SUPER TEMPORARY
  return (
    <Grid
      justifyContent="space-around"
      rowSpacing={1}
      container
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      {products.map((product, index) => ItemComponent({ ...product }, index))}
    </Grid>
  );
}
