import { useState, useEffect, useMemo } from 'react';

function UseFormattedData(data, metricUnits) {
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {

    const convertData = (data, metric) => data.map(({ time, temperature, humidity, co2 }) => {
      const formattedTemperature = metric ? temperature : (temperature * 1.8 + 32);

      return {
        time: time, // no formatting of time here
        humidity: humidity,
        temperature: formattedTemperature.toFixed(1),
        co2: co2,
      };
    });

    setFormattedData(convertData(data, metricUnits));
  }, [data, metricUnits]);

  return useMemo(() => formattedData, [formattedData]);
}

export default UseFormattedData;
