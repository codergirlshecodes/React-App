import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSpring, animated } from "react-spring";
import "./styles.css";

function WeatherForm() {
  const [city, setCity] = useState("Tampa");
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await Axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );

        if (!response.data) {
          throw new Error("City not found");
        }

        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
      }
    };

    fetchWeatherData();
  }, [city, apiKey]);

  const getAnimationProps = () => {
    return useSpring({
      opacity: 1,
      transform: "scale(1)",
      from: { opacity: 0, transform: "scale(0.5)" },
    });
  };

  const getWeatherEmoji = (weatherCode) => {
    switch (true) {
      case weatherCode >= 200 && weatherCode < 300:
        return "⚡️";
      case weatherCode >= 300 && weatherCode < 500:
        return "🌧️";
      case weatherCode >= 500 && weatherCode < 600:
        return "☔️";
      case weatherCode >= 600 && weatherCode < 700:
        return "❄️";
      case weatherCode >= 700 && weatherCode < 800:
        return "🌫️";
      case weatherCode === 800:
        return "☀️";
      case weatherCode === 801:
        return "🌤️";
      case weatherCode >= 802 && weatherCode < 900:
        return "☁️";
      default:
        return "❓";
    }
  };

  return (
    <div className="weather-form-container">
      <div className="weather-form">
        <div className="Weather">
          <form className="search-form">
            <input type="search" placeholder="Enter a city.." className="form-control" />
            <input type="submit" value="Search" className="btn btn-primary" />
          </form>
          <h1>Tampa</h1>
          <ul>
            <li>Friday 02:00</li>
            <li>Sunny</li>
          </ul>
          <div className="row">
            <div className="col-6">
              <img src="https://ssl.gstatic.com/onebox/weather/64/sunny_s_cloudy.png" alt="clear" />
              21°C
            </div>
            <div className="col-6">
              <ul>
                <li>Precipitation:0%</li>
                <li>Humidity: 85%</li>
                <li>Wind: 8km/h</li>
              </ul>
            </div>
          </div>
        </div>

        {weatherData && weatherData.daily && (
          <div className="forecast">
            <h3>5-Day Forecast</h3>
            {weatherData.daily.slice(1, 6).map((day, index) => (
              <div key={index} className="day-container">
                <animated.div style={getAnimationProps()}>
                  <p>{getWeatherEmoji(day.weather[0].id)}</p>
                </animated.div>
                <p>
                  {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "long",
                  })}
                </p>
                <p>{day.temp.day}°C</p>
              </div>
            ))}
          </div>
        )}

        {weatherData && (
          <div className="days-of-week">
            {weatherData.daily &&
              weatherData.daily.slice(1, 6).map((day, index) => (
                <div key={index}>
                  <p>
                    {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherForm;
