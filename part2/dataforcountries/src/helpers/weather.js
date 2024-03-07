import axios from 'axios';

const key = import.meta.env.VITE_WEATHER_KEY;

export default async function getWeather(city) {
  const response = await axios.get(
    `https://api.weatherbit.io/v2.0/current?key=${key}&city=${city}`
  );
  const iconLink = `https://cdn.weatherbit.io/static/img/icons/${response.data.data[0].weather.icon}.png`;
  const weatherData = {
    temp: response.data.data[0].temp,
    windSpeed: response.data.data[0].wind_spd,
    precipitation: response.data.data[0].precip,
    weatherIcon: iconLink,
    weatherDescription: response.data.data[0].weather.description,
  };
  return weatherData;
}
