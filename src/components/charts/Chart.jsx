// Third-party libraries
import React, { useState } from 'react';
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

// Local imports
import data from '../../data.json';
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
  const chartData = useFormattedData(data, metricUnits);

  const handleUnitChange = (event) => {
    setMetricUnits(event.target.value === 'metric');
  };

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



export default Chart;
