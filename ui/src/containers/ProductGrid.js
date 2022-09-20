import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import ItemComponent from "../components/Item";
//TODO//
//* Make map function to add all products *//

export default function BasicGrid({ productData }) {
  return (
    <Grid
      justifyContent="space-around"
      rowSpacing={1}
      container
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      rowBuffer={200}
    >
      {productData.map((product, index) => ItemComponent({ ...product }, index))}
    </Grid>
  );
}
