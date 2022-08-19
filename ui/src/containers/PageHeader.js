import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import AccountMenu from "../components/AccountMenu";
import CartMenu from "../components/CartMenu";
import FilterMenu from "../components/FilterMenu";
import SearchBar from "../components/SearchBar";
import { Stack } from '@mui/system';

export default function PageHeader({setFilterState}){
    console.log(setFilterState)
  return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1} columns={10}>
                <Grid xs={2}>
                    <SearchBar/>
                </Grid>
                <Grid xs={1} md={1} mdOffset="auto">
                    <Stack direction="row" spacing={1}>
                        <AccountMenu/>
                        <CartMenu/>
                    </Stack>
                </Grid>
                <Grid xs md={6} mdOffset={3}>
                    <FilterMenu setFilterState={setFilterState}/>
                </Grid>
            </Grid>
        </Box> 
  );
}