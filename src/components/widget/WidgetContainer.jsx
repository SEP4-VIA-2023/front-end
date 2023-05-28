// Importing required libraries and components
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import axios from 'axios';
import Widget from './Widget';

// WidgetContainer is a parent component that fetches data and passes it to child Widget components
const WidgetContainer = () => {
  // latestData state to hold the fetched data
  const [latestData, setLatestData] = useState([]);

  // Use useEffect hook to fetch data once the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
      
      // If no token found, log an error and return early
      if (!token) {
        console.error('No token found, please login first');
        return;
      }

      // Create axios instance with base URL and headers
      const apiClient = axios.create({
        baseURL: 'https://backend-esqp5xwphq-od.a.run.app/api/measurements',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Fetch data and handle potential errors
      try {
        const response = await apiClient.get('/');
        // get the 3 latest data entries and reverse the array
        // Reversing to display latest data first
        setLatestData(response.data.slice(-3).reverse());
      } catch (error) {
        // Log any errors
        console.error(error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array to fetch data only once the component is mounted

  // Render a Grid container with each Grid item containing a Widget with the relevant data
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

// Export WidgetContainer component
export default WidgetContainer;
