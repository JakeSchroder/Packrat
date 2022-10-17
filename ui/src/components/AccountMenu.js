import * as React from "react";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette:{
    primary:{
      main: '#E3E2CB',
      contrastText: '#000000',
    },
    secondary:{
       main: '#2A6364',
       contrastText: '#E3E2CB'
    }
  }
});

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* TODO: Implement action tied to clicking this button */}
      <ThemeProvider theme={theme}>
        <Button
          id="basic-menu"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          variant="contained"
          size="small"
          disableElevation={true}
          startIcon={<PersonIcon/>}
        >
          Account
        </Button>
      </ThemeProvider>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Account</MenuItem>
        <MenuItem onClick={handleClose}>Register</MenuItem>
      </Menu>
    </div>
  );
}
