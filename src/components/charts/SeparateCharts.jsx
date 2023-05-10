// Additional third-party library imports
import { YAxis } from 'recharts';

// Reuse these imports from the original code
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
          <XAxis dataKey="timestamp" stroke="#444" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke={color} activeDot={{ r: 8 }} />
          <Brush dataKey="timestamp" height={30} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  </Grid>
);

const SeparateCharts = () => {
  const [metricUnits, setMetricUnits] = useState(true);
  const chartData = useFormattedData(data, metricUnits);

  const handleUnitChange = (event) => {
    setMetricUnits(event.target.value === 'metric');
  };

  return (
    <Grid container spacing={3} justifyContent="center" style={styles.container}>
      <Grid item xs={12}>
        <UnitSelector metricUnits={metricUnits} handleUnitChange={handleUnitChange} />
      </Grid>
      <IndividualChart dataKey="humidity" color="#3f51b5" title="Humidity" data={chartData} />
      <IndividualChart dataKey="temperature" color="#f50057" title="Temperature" data={chartData} />
      <IndividualChart dataKey="co2" color="#4caf50" title="CO2 Levels" data={chartData} />
    </Grid>
  );
};

export default SeparateCharts;
