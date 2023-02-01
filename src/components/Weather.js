import React from "react";

import wind from "../assets/wind1.png";
import humidity from "../assets/moisture1.png";
import sunrise from "../assets/sunrise1.png";
import sunset from "../assets/sunset1.png";

function changeKelvinToCelcius(number) {
  return Math.round(number - 273.15);
}
function getTimeFromUnix(unixTimestamp, timezone) {
  let date = new Date((unixTimestamp + timezone) * 1000);
  let hours = "0" + date.getUTCHours();
  let minutes = "0" + date.getUTCMinutes();
  return hours.slice(-2) + ":" + minutes.slice(-2);
}

function Weather({ data }) {
  return (
    <div className="weather">
      <div className="weather__top">
        <h3 className="weather__city">
          {data.name},{data.sys.country}
        </h3>
        <img
          className="weather__icon"
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={`${data.weather[0].description}`}
        />
        <h1 className="weather__temp">
          {changeKelvinToCelcius(data.main.temp)}°C
        </h1>
        <p className="weather__description">{data.weather[0].description}</p>
        <div className="weather__others">
          <div className="weather__other">
            <img className="weather__others-icon" src={wind} alt="wind"></img>
            <p>
              {Math.round(data.wind.speed)} <span>m/s</span>
            </p>
          </div>
          <div className="weather__other">
            <img
              className="weather__others-icon"
              src={humidity}
              alt="humidity"
            ></img>
            <p>
              {data.main.humidity}
              <span>%</span>
            </p>
          </div>
          <div className="weather__other">
            <img
              className="weather__others-icon"
              src={sunrise}
              alt="sunrise"
            ></img>
            <p>{getTimeFromUnix(data.sys.sunrise, data.timezone)}</p>
          </div>
          <div className="weather__other">
            <img
              className="weather__others-icon"
              src={sunset}
              alt="sunset"
            ></img>
            <p>{getTimeFromUnix(data.sys.sunset, data.timezone)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export { changeKelvinToCelcius, getTimeFromUnix, Weather };
