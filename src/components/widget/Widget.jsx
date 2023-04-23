import React from 'react';
import { Box, Typography } from '@mui/material';

const Widget = ({ data }) => {
  const { timestamp, humidity, temperature, co2 } = data;

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px',
        width: '80%',
        height: '100px', // Change the height to fit the chart
      }}
    >
      <Typography variant="h5">
        {new Date(timestamp).toLocaleTimeString()}
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Humidity:</Typography>
        <Typography variant="body1">{humidity}%</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Temperature:</Typography>
        <Typography variant="body1">{temperature}&deg;C</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">CO2:</Typography>
        <Typography variant="body1">{co2}ppm</Typography>
      </Box>
    </Box>
  );
};

export default Widget;