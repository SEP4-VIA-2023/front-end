import React from 'react';
import { render, screen } from '@testing-library/react';
import Widget from './Widget';

describe('Widget', () => {
  it('renders the widget component with the provided data', () => {
    const data = {
      timestamp: new Date().getTime(),
      humidity: 50,
      temperature: 25,
      co2: 800,
    };
    render(<Widget data={data} />);

    const timestamp = screen.getByText(
      new Date(data.timestamp).toLocaleTimeString()
    );
    expect(timestamp).toBeInTheDocument();

    const humidity = screen.getByText('Humidity:');
    expect(humidity).toBeInTheDocument();
    const humidityValue = screen.getByText(`${data.humidity}%`);
    expect(humidityValue).toBeInTheDocument();

    const temperature = screen.getByText('Temperature:');
    expect(temperature).toBeInTheDocument();
    const temperatureValue = screen.getByText(`${data.temperature}°C`);
    expect(temperatureValue).toBeInTheDocument();

    const co2 = screen.getByText('CO2:');
    expect(co2).toBeInTheDocument();
    const co2Value = screen.getByText(`${data.co2}ppm`);
    expect(co2Value).toBeInTheDocument();
  });
});
