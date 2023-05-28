// Import required dependencies from third-party libraries
import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Brush
} from 'recharts';
import {
  Typography, Paper, Grid
} from '@material-ui/core';
import axios from 'axios';

// Local dependencies import
import useFormattedData from './UseFormattedData'; // Custom hook for data formatting
import UnitSelector from './UnitSelector'; // Custom component for unit selection

// Styles object that holds the styles for various components
const styles = {
  container: { margin: 'auto', maxWidth: '800px' },
  paper: { boxShadow: '0px 0px 10px #d9d9d9' },
  content: { padding: '24px' },
  title: { fontWeight: 'bold', color: '#3f51b5' },
};

// Component to render the chart
const Chart = () => {
  // State management for metric units and chart data
  const [metricUnits, setMetricUnits] = useState(true);
  const [chartData, setChartData] = useState([]);

  // Event handler for unit change
  const handleUnitChange = event => {
    setMetricUnits(event.target.value === 'metric');
  };

  // Effect hook to fetch measurements from the API
  useEffect(() => {
    // Async function to fetch measurements
    const fetchMeasurements = async () => {
      const token = localStorage.getItem('token');

      // Ensure token is available
      if (!token) {
        console.error('No token found, please login first');
        return;
      }

      // Base URL should be in environment variables for better environment-dependent configuration
      const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://backend-esqp5xwphq-od.a.run.app/api/measurements';
      
      // Create API client with the base URL and token
      const apiClient = axios.create({
        baseURL: BASE_URL,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Fetch and set data
      try {
        const response = await apiClient.get('/');
        setChartData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Invoke the async function
    fetchMeasurements();
  }, []);

  // Format chart data using the useFormattedData hook
  const formattedData = useFormattedData(chartData, metricUnits);

  // Return the JSX for the component
  return (
    <Grid container spacing={3} justifyContent="center" style={styles.container}>
      <Grid item xs={12}>
        <Paper elevation={3} style={styles.paper}>
          <div style={styles.content}>
            <Typography variant="h5" align="center" gutterBottom style={styles.title}>
              Humidity, Temperature, and CO2 Levels
            </Typography>
            <UnitSelector metricUnits={metricUnits} handleUnitChange={handleUnitChange} />
          </div>
          <ResponsiveContainer width="100%" height={500}>
            <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="time" stroke="#444" />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="humidity" stroke="#3f51b5" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="temperature" stroke="#f50057" />
              <Line type="monotone" dataKey="co2" stroke="#4caf50" />
              <Brush dataKey="time" height={30} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Chart;
