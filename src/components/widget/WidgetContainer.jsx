import React from 'react';
import { Grid } from '@mui/material';
import Widget from './Widget';
import data from '../../data.json';

const WidgetContainer = () => {
  const latestData = data.slice(-3).reverse(); // get the 3 latest data entries and reverse the array

  return (
    <Grid container spacing={2} justifyContent="center">
      {latestData.map((datum) => (
        <Grid item xs={12} md={4} key={datum.timestamp}>
          <Widget data={datum} />
        </Grid>
      ))}
    </Grid>
  );
};

export default WidgetContainer;