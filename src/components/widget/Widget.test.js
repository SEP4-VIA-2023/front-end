import { render, screen } from "@testing-library/react";
import Widget from "./Widget";

describe("Widget component", () => {
  const mockData = {
    time: new Date().toISOString(),
    humidity: 60,
    temperature: 25,
    co2: 400,
  };

  it("displays the time in 24hr format", () => {
    render(<Widget data={mockData} />);
    const timeElement = screen.getByText(/Time:/);
    const timeValueElement = screen.getByText(
      new RegExp(
        `${mockData.time.slice(11, 13)}:${mockData.time.slice(14, 16)}`
      )
    );
    expect(timeElement).toBeInTheDocument();
    expect(timeValueElement).toBeInTheDocument();
  });

  it("displays the humidity value", () => {
    render(<Widget data={mockData} />);
    const humidityElement = screen.getByText(/Humidity:/);
    const humidityValueElement = screen.getByText(`${mockData.humidity}%`);
    expect(humidityElement).toBeInTheDocument();
    expect(humidityValueElement).toBeInTheDocument();
  });

  it("displays the temperature value", () => {
    render(<Widget data={mockData} />);
    const temperatureElement = screen.getByText(/Temperature:/);
    const temperatureValueElement = screen.getByText(
      `${mockData.temperature}°C`
    );
    expect(temperatureElement).toBeInTheDocument();
    expect(temperatureValueElement).toBeInTheDocument();
  });

  it("displays the CO2 value", () => {
    render(<Widget data={mockData} />);
    const co2Element = screen.getByText(/CO2:/);
    const co2ValueElement = screen.getByText(`${mockData.co2}ppm`);
    expect(co2Element).toBeInTheDocument();
    expect(co2ValueElement).toBeInTheDocument();
  });
});
