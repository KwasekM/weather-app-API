import "./styles/App.css";

import Nav from "./components/Nav";
import { Weather } from "./components/Weather";
import { Forecast } from "./components/Forecast";

import { useEffect, useState } from "react";

const APIID = "2370443ee74ded285aeb1c108aa94b0d";
const forecastArr = 6;

function App() {
  const [dataWeather, setDataWeather] = useState([]);
  const [dataForecast, setDataForecast] = useState([]);
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const URLWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIID}`;
  const URLForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIID}`;

  useEffect(() => {
    const URLWeather = `https://api.openweathermap.org/data/2.5/weather?q=barcelona&appid=${APIID}`;
    const URLForecast = `https://api.openweathermap.org/data/2.5/forecast?q=barcelona&appid=${APIID}`;

    async function getInitialData() {
      const response1 = await fetch(URLWeather);
      const response2 = await fetch(URLForecast);
      await processWeatherDataAndForecast(response1, response2);
      setIsLoading(false);
    }
    getInitialData();
  }, []);

  async function newLocation(link1 = URLWeather, link2 = URLForecast) {
    try {
      const response1 = await fetch(link1);
      const response2 = await fetch(link2);
      if (response1.status === 200 && response2.status === 200) {
        processWeatherDataAndForecast(response1, response2);
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {}
  }

  async function processWeatherDataAndForecast(response1, response2) {
    const data1 = await response1.json();
    const data2 = await response2.json();

    const arrOfForecast = data2.list.slice(0, forecastArr);

    setDataWeather(data1);
    setDataForecast(arrOfForecast);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (city) {
      newLocation();
      setCity("");
    }
  }

  function handleChange(e) {
    setCity(e.target.value);
  }

  const forecastElements = dataForecast.map((element) => (
    <Forecast
      hour={element.dt_txt}
      icon={element.weather[0].icon}
      description={element.weather[0].description}
      temp={element.main.temp}
      timezone={dataWeather.timezone}
    />
  ));

  return (
    <div className="App">
      <Nav
        error={error}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        city={city}
      />
      {!isLoading && <Weather data={dataWeather} />}

      {!isLoading && (
        <div className="forecast">
          <p className="forecast__description">Next hours:</p>
          <div className="forecast__elements"> {forecastElements}</div>
        </div>
      )}
    </div>
  );
}

export default App;
