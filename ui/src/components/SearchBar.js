import * as React from "react";
import {
  Box,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";

export default function InputWithIcon() {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <TextField
        id="input-with-icon-textfield"
        label="Search"
        InputProps={{
          endAdornment: (
            // https://mui.com/material-ui/material-icons/
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
    </Box>
  );
}
