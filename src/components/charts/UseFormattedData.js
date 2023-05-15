import { useState, useEffect, useMemo } from 'react';

function UseFormattedData(data, metricUnits) {
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    const formatDate = (timestamp) => new Date(timestamp).toLocaleString();

    const convertData = (data, metric) => data.map(({ timestamp, temperature, humidity, co2 }) => {
      const formattedTemperature = metric ? temperature : (temperature * 1.8 + 32);
      const formattedHumidity = metric ? humidity : (humidity * 0.0295); // Adjust conversion factor as needed
      const formattedCO2 = metric ? co2 : (co2 * 0.001); // Adjust conversion factor as needed
    
      return {
        timestamp: formatDate(timestamp),
        humidity: formattedHumidity.toFixed(1),
        temperature: formattedTemperature.toFixed(1),
        co2: formattedCO2.toFixed(1),
      };
    });
    

    setFormattedData(convertData(data, metricUnits));
  }, [data, metricUnits]);

  return useMemo(() => formattedData, [formattedData]);
}

export default UseFormattedData;
