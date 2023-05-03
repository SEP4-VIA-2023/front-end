// Import necessary modules and components from external libraries
import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from 'recharts';
import { Typography, Paper, Grid, FormControl, Select, MenuItem } from '@material-ui/core';

// Import data from a JSON file
import data from '../data.json';

// Define a helper function to format timestamps as date strings
const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};

// Define a helper function to format the data based on metric units
const formatData = (data, metric) => {
  return data.map((item) => {
    // Convert temperature and humidity values based on metric flag
    const temperature = metric ? item.temperature : item.temperature * 1.8 + 32;
    const humidity = metric ? item.humidity : item.humidity * 2.54;
    // Return a new object with formatted data
    return {
      timestamp: formatDate(item.timestamp),
      humidity,
      temperature,
      co2: item.co2,
    };
  });
};

// Define the main Chart component
const Chart = () => {
  // Define state variables for chart data and metric units
  const [chartData, setChartData] = useState([]);
  const [metricUnits, setMetricUnits] = useState(true);

  // Use the useEffect hook to update the chart data when the metric units change
  useEffect(() => {
    setChartData(formatData(data, metricUnits));
  }, [metricUnits]);

  // Define a function to handle changes to the metric units dropdown
  const handleUnitChange = (event) => {
    setMetricUnits(event.target.value === 'metric');
  };

  // Render the chart and associated UI elements
  return (
    <Grid container spacing={3} justifyContent="center" style={{ margin: 'auto', maxWidth: '800px' }}>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ boxShadow: '0px 0px 10px #d9d9d9' }}>
          <div style={{ padding: '24px' }}>
            <Typography variant="h5" align="center" gutterBottom style={{ fontWeight: 'bold', color: '#3f51b5' }}>
              Humidity, Temperature, and CO2 Levels
            </Typography>
            <FormControl style={{ minWidth: '100px', marginLeft: 'auto' }}>
              <Select value={metricUnits ? 'metric' : 'imperial'} onChange={handleUnitChange}>
                <MenuItem value="imperial">Imperial</MenuItem>
                <MenuItem value="metric">Metric</MenuItem>
              </Select>
            </FormControl>
          </div>
          <ResponsiveContainer width="100%" height={500}>
            {/* Define the line chart with data and styling */}
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="timestamp" stroke="#444" />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="humidity" stroke="#3f51b5" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="temperature" stroke="#f50057" />
              <Line type="monotone" dataKey="co2" stroke="#4caf50" />
              <Brush dataKey="timestamp" height={30} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

// Export the Chart component as the default export of this module
export default Chart;