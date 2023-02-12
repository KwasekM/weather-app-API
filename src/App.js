import "./styles/app.css";
import { GlobalStyle } from "./styles/GlobalStyle";

import { nanoid } from "nanoid";

import Nav from "./components/Nav";
import { Weather } from "./components/Weather";
import { Forecast } from "./components/Forecast";
import { Settings } from "./components/Settings";

import { useEffect, useState, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";

const APIID = "2370443ee74ded285aeb1c108aa94b0d";
const forecastArrLength = 6;

function App() {
  const [dataWeather, setDataWeather] = useState([]);
  const [dataForecast, setDataForecast] = useState([]);
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [defaultCity, setDefaultCity] = useState(
    JSON.parse(localStorage.getItem("defaultCity")) || "barcelona"
  );
  const [isToggled, setIsToggled] = useState(
    JSON.parse(localStorage.getItem("isToggled")) || false
  );
  const [userBackgroundImage, setUserBackgroundImage] = useState(
    JSON.parse(localStorage.getItem("userBackgroundImage")) || "image1.png"
  );

  const inputDefaultCityRef = useRef(null);

  const URLWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIID}`;
  const URLForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIID}`;

  useEffect(() => {
    localStorage.setItem(
      "userBackgroundImage",
      JSON.stringify(userBackgroundImage)
    );
  }, [userBackgroundImage]);

  useEffect(() => {
    localStorage.setItem("isToggled", JSON.stringify(isToggled));
  }, [isToggled]);

  useEffect(() => {
    localStorage.setItem("defaultCity", JSON.stringify(defaultCity));
  }, [defaultCity]);

  useEffect(() => {
    const URLWeather = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${APIID}`;
    const URLForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity}&appid=${APIID}`;

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

    const arrOfForecast = data2.list.slice(0, forecastArrLength);

    setDataWeather(data1);
    setDataForecast(arrOfForecast);
  }

  function settingsHandleSubmit(e) {
    e.preventDefault();

    if (inputDefaultCityRef.current.value) {
      async function getDefaultCity() {
        try {
          const response1 = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${inputDefaultCityRef.current.value}&appid=${APIID}`
          );
          if (response1.status === 200) {
            setDefaultCity(inputDefaultCityRef.current.value);
            e.target.style.border = `3px solid greenyellow`;
          } else if (response1.status !== 200) {
            e.target.style.border = `3px solid rgba(255, 99, 71, 1)`;
          }
        } catch (error) {}
        inputDefaultCityRef.current.value = "";
      }
      getDefaultCity();
    }
  }

  function navHandleSubmit(e) {
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
      key={nanoid()}
      isToggled={isToggled}
      hour={element.dt_txt}
      icon={element.weather[0].icon}
      description={element.weather[0].description}
      temp={element.main.temp}
      timezone={dataWeather.timezone}
    />
  ));

  return (
    <div className="App">
      <GlobalStyle userBackgroundImage={userBackgroundImage}></GlobalStyle>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Link to="/settings">
                <i className="icon fa-solid fa-gear"></i>
              </Link>
              <Nav
                error={error}
                navHandleSubmit={navHandleSubmit}
                handleChange={handleChange}
                city={city}
              />
              {!isLoading && (
                <Weather isToggled={isToggled} data={dataWeather} />
              )}
              {!isLoading && (
                <div className="forecast">
                  <p className="forecast__description">Next hours:</p>
                  <div className="forecast__elements"> {forecastElements}</div>
                </div>
              )}
            </>
          }
        ></Route>
        <Route
          path="/settings"
          element={
            <Settings
              userBackgroundImage={userBackgroundImage}
              setUserBackgroundImage={setUserBackgroundImage}
              isToggled={isToggled}
              setIsToggled={setIsToggled}
              settingsHandleSubmit={settingsHandleSubmit}
              inputDefaultCityRef={inputDefaultCityRef}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
