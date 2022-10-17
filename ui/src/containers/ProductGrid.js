import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import ItemComponent from "../components/Item";
//TODO//
//* Make map function to add all products *//

export default function BasicGrid({ productData }) {
  return (
    <Grid
      columns={4}
      rowSpacing={1}
      container
      alignItems="baseline"
      padding="5%"
      justifyContent="space-evenly"
      paddingBottom={0}
    >
      {productData.map((product, index) => ItemComponent({ ...product }, index))}
    </Grid>
  );
}
