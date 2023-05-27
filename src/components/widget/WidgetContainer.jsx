import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import axios from 'axios';
import Widget from './Widget';

const WidgetContainer = () => {
  const [latestData, setLatestData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, please login first');
        return;
      }

      const apiClient = axios.create({
        baseURL: 'https://backend-esqp5xwphq-od.a.run.app/api/measurements',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      try {
        const response = await apiClient.get('/');
        // get the 3 latest data entries and reverse the array
        setLatestData(response.data.slice(-3).reverse());
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={2} justifyContent="center">
      {latestData.map((datum) => (
        <Grid item xs={12} md={3} key={datum.time}>
          <Widget data={datum} />
        </Grid>
      ))}
    </Grid>
  );
};

export default WidgetContainer;
