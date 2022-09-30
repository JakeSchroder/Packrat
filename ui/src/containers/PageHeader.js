import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import AccountMenuComponent from "../components/AccountMenu";
import CartComponent from "../components/Cart";
import FilterTabsComponent from "../components/FilterTabs";
import SearchBarComponent from "../components/SearchBar";
import { Stack } from "@mui/system";

export default function PageHeader({ setPageIndex, setProductData, setTypeFilterState, setSortFilterState, pageFilters}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} columns={10} >
        <Grid xs={2} >
          <Stack direction="row" spacing={1}>
            <FilterTabsComponent setPageIndex={setPageIndex} setProductData={setProductData} setFilterState={setTypeFilterState} title={'Type'} optionFilter={pageFilters['type']} />
            <FilterTabsComponent setPageIndex={setPageIndex} setProductData={setProductData} setFilterState={setSortFilterState} title={'Sort'} optionFilter={pageFilters['sort']} />
          </Stack>
        </Grid>
        <Grid xs={1} md={1} mdOffset="auto">
          <Stack direction="row" spacing={1}>
            <AccountMenuComponent />
            <CartComponent />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
