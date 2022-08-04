import { useState } from 'react';
import styles from './App.module.css';
import { CONVERT_LOCATION, fetchCurrentWeather, fetchWeatherForecast } from './api/fetchWeather';
import { TextField, Snackbar, Alert, LinearProgress, CircularProgress } from '@mui/material';
import Forecast from './components/Forecast/Forecast';





function App() {

  const [query, setQuery] = useState("");
  const [weatherForecast, setWeatherForecast] = useState({});
  const [currentWeather, setCurrentWeather] = useState({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)


  const search = async (e) => {
    if(e.key === 'Enter') {

      try {
        setLoading(true)
        const { lat, lon } = await CONVERT_LOCATION(query);
        const currentWeather = await fetchCurrentWeather(query);
        const weatherForecast = await fetchWeatherForecast(lat, lon);

        // Reset states
        setCurrentWeather(currentWeather);
        setWeatherForecast(weatherForecast);
        setLoading(false)
        setQuery("");
      }
      catch (err) {
        setLoading(false)
        setOpen(true);

        setTimeout(() => {
          setOpen(false)
        }, 4000);
      }

    }
  }





  
  let forecastList = []

  if(weatherForecast.list) {
    for(let i = 7; i <= 32; i+=8) {
      forecastList.push(weatherForecast.list[i])
    }
  }



  return (
    <div className={styles.container}>
      <h1> Weather no go whine you! </h1>

      <TextField 
        type= "text"
        label="Search..."
        variant='filled'
        size="small"
        fullWidth
        value = {query}
        onChange = {(e) => setQuery(e.target.value)}
        onKeyPress = { search }
        autoFocus
      />

  {
    loading ?
    <CircularProgress sx={{ margin: '3% 0'}} style={{ width: '100px', height: '100px', color: 'white'}} /> : 
    <div>
    {
      currentWeather.main && 
        <div className={styles.results}>
          <h2> 
            {weatherForecast.city.name} 
            <span> { weatherForecast.city.country } </span> 
          </h2>

            { 
              weatherForecast.city.population > 1 ?
              <p> <b> {weatherForecast.city.population} </b> people live here </p> :
              <p> Total population can't be gotten now </p> 
            }

          <p> <b> Humidity ~ </b> { currentWeather.main.humidity }% </p>

          <div className={styles.temperature}>
            <h2> {Math.round(currentWeather.main.temp)}<sup>&deg;c</sup> </h2>
          </div>

          <div className={styles.info}>
            <img alt={currentWeather.weather[0].description} src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} />
            <p> {currentWeather.weather[0].description} </p> 
          </div>
        </div>
    }

    {
      weatherForecast.list && (
        <div className={styles.forecast}>
          {
            forecastList && 
              forecastList.map((each, id) => <Forecast key={id} forecast={each} />)
          }
        </div>
        )
      }
    </div>

  }



      <footer>
        <p> Made with 💕 ❤ by <a href="https://twitter.com/ezelujhay" target="_blank"> Ezelu </a></p>
      </footer>

      <Snackbar open={open}>
        <Alert severity="error"> City doesn't exist! </Alert>
      </Snackbar>

    </div>
  );
}

export default App;















































// import { useState } from 'react';
// import styles from './App.module.css';
// import { CONVERT_LOCATION, fetchCurrentWeather, fetchWeatherForecast } from './api/fetchWeather';
// import { TextField, Snackbar, Alert } from '@mui/material';
// import Forecast from './components/Forecast/Forecast';





// function App() {

//   const [query, setQuery] = useState("");
//   const [weatherForecast, setWeatherForecast] = useState({});
//   const [currentWeather, setCurrentWeather] = useState({});
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false)


//   const search = async (e) => {
//     if(e.key === 'Enter') {

//       try {
//         setLoading(true)
//         const { lat, lon } = await CONVERT_LOCATION(query);
//         const currentWeather = await fetchCurrentWeather(query);
//         const weatherForecast = await fetchWeatherForecast(lat, lon);

//         // Reset states
//         setCurrentWeather(currentWeather);
//         setWeatherForecast(weatherForecast);
//         setLoading(false)
//         setQuery("");
//       }
//       catch (err) {
//         setLoading(false)
//         setOpen(true);

//         setTimeout(() => {
//           setOpen(false)
//         }, 4000);
//       }

//     }
//   }





  
//   let forecastList = []

//   if(weatherForecast.list) {
//     for(let i = 7; i <= 32; i+=8) {
//       forecastList.push(weatherForecast.list[i])
//     }
//   }



//   return (
//     <div className={styles.container}>
//       <h1> Weather no go whine you! </h1>

//       <TextField 
//         type= "text"
//         label="Search..."
//         variant='filled'
//         size="small"
//         fullWidth
//         value = {query}
//         onChange = {(e) => setQuery(e.target.value)}
//         onKeyPress = { search }
//         autoFocus
//       />

//       {
//         currentWeather.main && (
//           <div className={styles.results}>
//             <h2> 
//               {weatherForecast.city.name} 
//               <span> { weatherForecast.city.country } </span> 
//             </h2>
//               { 
//                 weatherForecast.city.population > 1 ?
//                 <p> <b> {weatherForecast.city.population} </b> people live here </p> :
//                 <p> Total population can't be gotten now </p> 
//               }

//             <p> <b> Humidity ~ </b> { currentWeather.main.humidity }% </p>

//             <div className={styles.temperature}>
//               <h2> {Math.round(currentWeather.main.temp)}<sup>&deg;c</sup> </h2>
//             </div>

//             <div className={styles.info}>
//               <img alt={currentWeather.weather[0].description} src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} />
//               <p> {currentWeather.weather[0].description} </p> 
//             </div>
//           </div>
//         )
//       }



//       {
//         weatherForecast.list && (
//           <div className={styles.forecast}>
//             {
//               forecastList && forecastList.map((each, id) => <Forecast key={id} forecast={each} />)
//             }
//           </div>
//         )
//       }


//       <footer>
//         <p> Made with 💕 ❤ by <a href="https://twitter.com/ezelujhay" target="_blank"> Ezelu </a></p>
//       </footer>

//       <Snackbar open={open}>
//         <Alert severity="error"> City doesn't exist! </Alert>
//       </Snackbar>

//     </div>
//   );
// }

// export default App;




