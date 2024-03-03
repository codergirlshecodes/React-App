import React, { useState, useEffect } from "react";
import "./styles.css";

function WeatherForm() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
  const apiKeyforecast = "f85b4c8af95ecff3712840a8134d0e7d";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("City not found");
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
      }
    };

    const fetchForecastData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKeyforecast}`
        );

        if (!response.ok) {
          throw new Error("Forecast data not found");
        }

        const data = await response.json();
        setWeatherData((prevData) => ({
          ...prevData,
          forecast: data.list,
        }));
      } catch (error) {
        console.error("Error fetching forecast data:", error.message);
      }
    };

    if (city) {
      fetchWeatherData();
      fetchForecastData();
    }
  }, [city, apiKey, apiKeyforecast]);

  const getWeekday = (index) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDayIndex = new Date().getDay();
    return days[(currentDayIndex + index) % days.length];
  };

  return (
    <div className="weather-form-container">
      <div className="weather-form">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input"
        />
        <button className="button" onClick={() => {}}>
          Get Weather
        </button>

        {weatherData && (
          <div className="additional-info">
            <h3>Current Weather</h3>
            <p>{weatherData.weather[0].description}</p>
            <p>Temperature: {weatherData.main.temp} °C</p>
            <p>Precipitation: {weatherData.clouds.all}%</p>
            <p>Wind: {weatherData.wind.speed} km/h</p>
          </div>
        )}

        {weatherData && (
          <div className="forecast">
            <h3>5-Day Forecast</h3>
            <div className="forecast-grid">
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} className="forecast-day">
                  <p>{getWeekday(index)}</p>
                  {weatherData.forecast && (
                    <p>{weatherData.forecast[index].main.temp}°C</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherForm;
