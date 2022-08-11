import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function AccessibleTabs2() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tabNames = ['Top', 'Bottom', 'Jewlery', 'Hat', 'Misc.'];
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where each tab needs to be selected manually"
      >
        {
            tabNames.map((name, index) => (<Tab key={index} label={name} />))
        }
      </Tabs>
    </Box>
  );
}
