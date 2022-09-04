import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import AccountMenuComponent from "../components/AccountMenu";
import CartComponent from "../components/Cart";
import FilterTabsComponent from "../components/FilterTabs";
import SearchBarComponent from "../components/SearchBar";
import { Stack } from "@mui/system";

export default function PageHeader({ setFilterState, setIsLoading}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} columns={10}>
        <Grid xs={2}>
          <SearchBarComponent />
        </Grid>
        <Grid xs={1} md={1} mdOffset="auto">
          <Stack direction="row" spacing={1}>
            <AccountMenuComponent />
            <CartComponent />
          </Stack>
        </Grid>
        <Grid xs md={6} mdOffset={3}>
          <FilterTabsComponent setFilterState={setFilterState} setIsLoading={setIsLoading}/>
        </Grid>
      </Grid>
    </Box>
  );
}
