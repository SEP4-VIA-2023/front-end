// Third-party libraries
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
import {
  Typography,
  Paper,
  Grid,
} from '@material-ui/core';
import axios from 'axios';

// Local imports
import useFormattedData from './UseFormattedData';
import UnitSelector from './UnitSelector';

// Styles
const styles = {
  container: {
    margin: 'auto',
    maxWidth: '800px',
  },
  paper: {
    boxShadow: '0px 0px 10px #d9d9d9',
  },
  content: {
    padding: '24px',
  },
  title: {
    fontWeight: 'bold',
    color: '#3f51b5',
  },
};

const Chart = () => {
  const [metricUnits, setMetricUnits] = useState(true);
  const [chartData, setChartData] = useState([]);

  const handleUnitChange = (event) => {
    setMetricUnits(event.target.value === 'metric');
  };

  useEffect(() => {
    const fetchMeasurements = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found, please login first');
        return;
      }

      const apiClient = axios.create({
        baseURL: 'https://backend-esqp5xwphq-od.a.run.app/api/measurements',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      try {
        const response = await apiClient.get('/');
        setChartData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeasurements();
  }, []);

  // Process `chartData` with `useFormattedData` and `metricUnits` here
  const formattedData = useFormattedData(chartData, metricUnits);

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
