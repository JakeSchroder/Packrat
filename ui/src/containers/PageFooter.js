import { Box } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Pagination from "../components/Pagination";

export default function PageFooter(){
    return(
        <Box>
            <Grid container justifyContent="center"> 
                <Pagination/>
            </Grid>
        </Box>
    );
}