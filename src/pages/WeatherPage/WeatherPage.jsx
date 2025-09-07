import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Grid,
  Paper,
} from "@mui/material";
import axios from "axios";

function WeatherPage() {
  const [city, setCity] = useState("Рівне");
  const [weather, setWeather] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "9257ee4946288ea85c0d6ffcdceba30f";

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError("");
    try {
      const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=ua`;
      const { data: geoData } = await axios.get(geoUrl);

      setWeather(geoData);
      const { lat, lon } = geoData.coord;
      const hourlyUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ua`;
      const { data: hourlyData } = await axios.get(hourlyUrl);

      setHourly(hourlyData.list.slice(0, 8));
    } catch (err) {
      if (err.response?.status === 404) {
        setError("Місто не знайдено ❌");
      } else if (err.response?.status === 401) {
        setError("Помилка API ключа 🔑");
      } else {
        setError("Сталася помилка. Спробуйте пізніше.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeather(city);
    }
  };

  const formatHour = (dtTxt) => {
    const date = new Date(dtTxt);
    return date.toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e1e2f 0%, #2a2a3d 100%)",
        color: "white",
        p: 5,
      }}
    >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#90caf9" }}
          >
            Погода у місті
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            label="Введіть місто"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
            sx={{
              mb: 3,
              input: { color: "white" },
              label: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#90caf9" },
                "&:hover fieldset": { borderColor: "#42a5f5" },
                "&.Mui-focused fieldset": { borderColor: "#1e88e5" },
              },
            }}
          />

          {loading && (
            <Box textAlign="center" my={3}>
              <CircularProgress color="inherit" />
            </Box>
          )}

          {error && (
            <Typography color="error" align="center" sx={{ fontWeight: "bold" }}>
              {error}
            </Typography>
          )}

          {weather && !loading && (
            <>
              <Card
                sx={{
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 3,
                  mb: 4,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                  color: "white",
                }}
              >
                <CardContent>
                  <Typography variant="h5" align="center" gutterBottom>
                    {weather.name}, {weather.sys.country}
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                    mb={2}
                  >
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].description}
                    />
                    <Typography variant="h3">
                      {Math.round(weather.main.temp)}°C
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    🌬 Вітер: {weather.wind.speed} м/с
                  </Typography>
                  <Typography variant="body1">
                    ☁ Хмарність: {weather.clouds.all}%
                  </Typography>
                  <Typography variant="body1">
                    🌡 Тиск: {weather.main.pressure} гПа
                  </Typography>
                </CardContent>
              </Card>

              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#90caf9" }}
              >
                Прогноз на 24 години
              </Typography>
              <Grid container spacing={2}>
                {hourly.map((hour, index) => (
                  <Grid size={2} key={index}>
                    <Card
                      sx={{
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: 3,
                        textAlign: "center",
                        p: 1,
                        color: "white",
                        boxShadow: "0 6px 12px rgba(0,0,0,0.4)",
                        "&:hover": {
                          background: "rgba(255,255,255,0.15)",
                          transform: "scale(1.05)",
                          transition: "0.3s",
                        },
                      }}
                    >
                      <Typography variant="body2">
                        {formatHour(hour.dt_txt)}
                      </Typography>
                      <img
                        src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                        alt={hour.weather[0].description}
                      />
                      <Typography variant="h6">
                        {Math.round(hour.main.temp)}°C
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
    </Box>
  );
}

export default WeatherPage;
