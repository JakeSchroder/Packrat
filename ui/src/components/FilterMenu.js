import * as React from 'react';
import {Tab, Tabs, Box} from '@mui/material';

export default function AccessibleTabs2() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tabNames = ['All', 'Top', 'Bottom', 'Jewlery', 'Hat', 'Misc.'];
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
