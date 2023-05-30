import React from 'react';
import { Box, Typography } from '@mui/material';

// Widget component to display environmental data
const Widget = ({ data }) => {
  // Destructure data prop to get individual data fields
  const { time, humidity, temperature, co2 } = data;

  // Extract hour and minute from time string
  const hour = time.slice(11,13);
  const minute = time.slice(14,16);

  // Return the main Widget component
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px',
        width: '100%',
        height: 'auto',
        boxSizing: 'border-box',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        ':hover': {
          boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      {/* Display the time */}
      <Typography variant="h5">
        Time: {hour}:{minute}
      </Typography>

      {/* Display humidity value */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Humidity:</Typography>
        <Typography variant="body1">{humidity}%</Typography>
      </Box>

      {/* Display temperature value */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">Temperature:</Typography>
        <Typography variant="body1">{temperature}&deg;C</Typography>
      </Box>

      {/* Display CO2 value */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1">CO2:</Typography>
        <Typography variant="body1">{co2}ppm</Typography>
      </Box>
    </Box>
  );
};

// Export Widget component
export default Widget;
