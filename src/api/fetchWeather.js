import axios from 'axios';



const API_KEY = '7000c2331d3aa19eefcaf49a1b99815d';



export const fetchCurrentWeather = async (query) => {
  const URL = 'https://api.openweathermap.org/data/2.5/weather';

  const {data} = await axios.get(URL, {
    params: {
      q: query,
      units: 'metric',
      APPID: API_KEY,
    }
  });

  return data;

}



export const fetchWeatherForecast = async (lat, lon) => {
  const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=7000c2331d3aa19eefcaf49a1b99815d`;
  
  const {data} = await axios.get(URL);
  
  return data;

}





export const CONVERT_LOCATION = async (query) => {
  const URL = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=7000c2331d3aa19eefcaf49a1b99815d`
  
  const { data } = await axios.get(URL);

  return {
    lat: data[0].lat,
    lon: data[0].lon,
  };
}


