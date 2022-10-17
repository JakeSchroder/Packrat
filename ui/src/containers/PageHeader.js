import Grid from "@mui/material/Unstable_Grid2";
import AccountMenuComponent from "../components/AccountMenu";
import CartComponent from "../components/Cart";
import FilterTabsComponent from "../components/FilterTabs";
import SearchBarComponent from "../components/SearchBar";
import { Stack } from "@mui/system";
import { ReactComponent as Logo } from "../packrat_logo.svg";

export default function PageHeader({ setPageIndex, setProductData, setTypeFilterState, setSortFilterState, pageFilters}) {
  return (
    <Grid container spacing={2} columns={8} justifyContent="space-between">
      <Grid xs={1} md={1} columns={3}>
        <Stack direction="row" spacing={1} >
          <FilterTabsComponent setPageIndex={setPageIndex} setProductData={""} setFilterState={""} title={'Menu'} optionFilter={['About', 'Shop All', 'Blog']} />
          <FilterTabsComponent setPageIndex={setPageIndex} setProductData={setProductData} setFilterState={setTypeFilterState} title={'Type'} optionFilter={pageFilters['type']} />
          <FilterTabsComponent setPageIndex={setPageIndex} setProductData={setProductData} setFilterState={setSortFilterState} title={'Sort'} optionFilter={pageFilters['sort']} />
        </Stack>
      </Grid>
      <Grid xs={1} md={1} columns={1} rowGap={3}>
        <Logo/>
      </Grid>
      <Grid xs={1} md={1} columns={2}>
        <Stack direction="row" spacing={1}>
          <CartComponent />
          <AccountMenuComponent />
        </Stack>
      </Grid>

    </Grid>
  );
}
