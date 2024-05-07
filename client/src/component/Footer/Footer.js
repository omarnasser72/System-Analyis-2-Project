import React, { useState, useEffect } from "react";
import "./Footer.css";
import axios from "axios";

const Footer = () => {
  const [weather, setWeather] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [weatherError, setWeatherError] = useState(null);
  const [dateTimeError, setDateTimeError] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get("http://localhost:5003/api/weather");
      console.log(response?.data?.value);
      setWeather(response?.data?.value?.split(" ")[0]);
    } catch (error) {
      setWeatherError("Failed to fetch weather data. Please try again later.");
      console.error("Error fetching weather:", error);
    }
  };

  const fetchDateTime = async () => {
    try {
      const response = await axios.get("http://localhost:4000/datetime");
      console.log(response?.data);
      setDateTime(response.data);
    } catch (error) {
      setDateTimeError(
        "Failed to fetch date and time data. Please try again later."
      );
      console.error("Error fetching date and time:", error);
    }
  };

  useEffect(() => {
    fetchWeather();
    fetchDateTime();
  }, []);

  return (
    <div className="Footer_id">
      {weather && (
        <div className="weather">
          {/*<p>Weather: {weather.description}</p>*/}
          <p>Temperature: {weather}°C</p>
        </div>
      )}

      {weatherError && <p>{weatherError}</p>}
      {dateTime && (
        <p>
          Date and Time: {dateTime.time} {dateTime.date}
        </p>
      )}
      {dateTimeError && <p>{dateTimeError}</p>}

      <p>All Copyright &copy; reserved to our website</p>
    </div>
  );
};

export default Footer;
