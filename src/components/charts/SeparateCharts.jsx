// Import third-party libraries
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush } from 'recharts';
import { Typography, Paper, Grid } from '@material-ui/core';
import axios from 'axios';

// Import local components and hooks
import useFormattedData from './UseFormattedData';
import UnitSelector from './UnitSelector';

// Define the component's styles
const styles = {
  container: { margin: 'auto', maxWidth: '800px' },
  paper: { boxShadow: '0px 0px 10px #d9d9d9' },
  content: { padding: '24px' },
  title: { fontWeight: 'bold', color: '#3f51b5' },
};

// Component for individual charts
const IndividualChart = ({ dataKey, color, title, data }) => (
  <Grid item xs={12} md={12}>
    <Paper elevation={3} style={styles.paper}>
      <div style={styles.content}>
        <Typography variant="h6" align="center" gutterBottom style={styles.title}>
          {title}
        </Typography>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="time" stroke="#444" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke={color} activeDot={{ r: 8 }} />
          <Brush dataKey="time" height={30} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  </Grid>
);

// Main component to render the separate charts
const SeparateCharts = () => {
  const [metricUnits, setMetricUnits] = useState(true);
  const [chartData, setChartData] = useState([]);

  const handleUnitChange = event => setMetricUnits(event.target.value === 'metric');

  useEffect(() => {
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

    fetchMeasurements();
  }, []);

  const formattedData = useFormattedData(chartData, metricUnits);

  return (
    <Grid container spacing={3} justifyContent="center" style={styles.container}>
      <Grid item xs={12}>
        <UnitSelector metricUnits={metricUnits} handleUnitChange={handleUnitChange} />
      </Grid>
      <IndividualChart dataKey="humidity" color="#3f51b5" title="Humidity" data={formattedData} />
      <IndividualChart dataKey="temperature" color="#f50057" title="Temperature" data={formattedData} />
      <IndividualChart dataKey="co2" color="#4caf50" title="CO2 Levels" data={formattedData} />
    </Grid>
  );
};

export default SeparateCharts;
