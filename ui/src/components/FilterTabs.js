import * as React from 'react';
import {Tab, Tabs, Box} from '@mui/material';

export default function FilterMenu({setFilterState}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFilterState(tabNames[newValue])// Should change because this is a no-no
  };
  const tabNames = ['All', 'Top', 'Bottom', 'Jewelery', 'Hat', 'Misc.'];
  return (
      <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where each tab needs to be selected manually"
      >
        {
            tabNames.map((name, index) => (<Tab key={index} label={name} />))
        }
      </Tabs>
  );
}
