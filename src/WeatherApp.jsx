import React, { useState } from "react";
import { Card, CardContent, Typography, TextField, Button, Grid } from "@mui/material";

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
        `https://api.weatherapi.com/v1/current.json?key=577fecaf4cec44bcbde132423253003&q=${city}`
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
    <div style={{ padding: "20px", textAlign: "center" }}>
      <Card sx={{ maxWidth: 500, margin: "auto", padding: "20px" }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="Enter city name"
                variant="outlined"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" color="primary" onClick={fetchWeather}>
                Search
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {loading && <Typography mt={2}><p>Loading data…</p></Typography>}
      {weather && (
        <Grid container spacing={2} mt={3} justifyContent="center">
          <Grid item className="weather-cards">
            <Card className="weather-card" sx={{ minWidth: 200 }}>
              <CardContent>
                <Typography variant="h6">Temperature</Typography>
                <Typography>{weather.current.temp_c}°C</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className="weather-card" sx={{ minWidth: 200 }}>
              <CardContent>
                <Typography variant="h6">Condition</Typography>
                <Typography>{weather.current.condition.text}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className="weather-card" sx={{ minWidth: 200 }}>
              <CardContent>
                <Typography variant="h6">Wind Speed</Typography>
                <Typography>{weather.current.wind_kph} kph</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className="weather-card" sx={{ minWidth: 200 }}>
              <CardContent>
                <Typography variant="h6">Humidity</Typography>
                <Typography>{weather.current.humidity}%</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default WeatherApp;