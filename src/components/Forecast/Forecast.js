import React from 'react';
import styles from './Forecast.module.css';
import moment from 'moment';



const Forecast = ({ forecast }) => {

  const day = forecast.dt_txt.slice(0, 10);
  const dayString = moment(day).format('dddd');


  return (
    <div className={styles.box}>
      <img alt={forecast.weather[0].description} src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} />
      <p> {forecast.weather[0].description} </p>
      <p> {(forecast.main.temp).toFixed(0)}<sup>&deg;c</sup> </p>
      <p> <b> { (dayString).toUpperCase() } </b> </p>
    </div>
  )
}

export default Forecast