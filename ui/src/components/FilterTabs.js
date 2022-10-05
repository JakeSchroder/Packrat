import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="contained"
      >
        {title}
      </Button>
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
