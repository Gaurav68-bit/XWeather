import React, { useState } from "react";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=577fecaf4cec44bcbde132423253003&q=${city}`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex gap-2">
        <input
          type="text"
          className="border p-2 rounded"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={fetchWeather}
        >
          Search
        </button>
      </div>
      {loading && <p>Loading data…</p>}
      {weather && (
        <div className="weather-cards grid gap-4 p-4">
          <div className="weather-card border p-4 rounded shadow">
            <h2 className="text-xl font-bold">{weather.location.name}</h2>
            <p>Temperature: {weather.current.temp_c}°C</p>
            <p>Humidity: {weather.current.humidity}%</p>
            <p>Condition: {weather.current.condition.text}</p>
            <p>Wind Speed: {weather.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
