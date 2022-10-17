import * as React from "react";
import { Button, IconButton } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
          startIcon={<ShoppingCartIcon/>}
        >
          Cart
        </Button>
      </ThemeProvider>
    </div>
  );
}
