import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

export default function BasicMenu({setPageIndex, setProductData, setFilterState, title, optionFilter}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const addMap = (event, value) => {
    setFilterState(value);
    setPageIndex(0);
    setProductData([]);
    handleClose();
  };
  
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          variant="contained"
          color="primary"
          size="small"
          disableElevation={true}
          endIcon={<ExpandMoreIcon/>}
        >
          {title}
        </Button>
      </ThemeProvider>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {optionFilter.map((option) => (
          <MenuItem key={option} onClick={(e) => addMap(e, option)}>
            {option.replaceAll('_', ' ')}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
