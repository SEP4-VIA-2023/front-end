import { useState, useEffect, useMemo } from 'react';

function UseFormattedData(data, metricUnits) {
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    const formatDate = (timestamp) => new Date(timestamp).toLocaleString();

    const convertData = (data, metric) => data.map(({ timestamp, temperature, humidity, co2 }) => {
      const formattedTemperature = metric ? temperature.toFixed(1) + ' °C' : (temperature * 1.8 + 32).toFixed(1) + ' °F';
      const formattedHumidity = metric ? humidity.toFixed(1) + ' %' : (humidity * 0.0295).toFixed(1) + ' in'; // Adjust conversion factor as needed
      const formattedCO2 = metric ? co2.toFixed(1) + ' ppm' : (co2 * 0.001).toFixed(1) + ' kppm'; // Adjust conversion factor as needed

      return {
        timestamp: formatDate(timestamp),
        humidity,
        temperature,
        co2,
        formattedTemperature,
        formattedHumidity,
        formattedCO2,
      };
    });

    setFormattedData(convertData(data, metricUnits));
  }, [data, metricUnits]);

  return useMemo(() => formattedData, [formattedData]);
}

export default UseFormattedData;
