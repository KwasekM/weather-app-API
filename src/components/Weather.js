import React from "react";

import wind from "../assets/icons-weather/wind1.png";
import humidity from "../assets/icons-weather/moisture1.png";
import sunrise from "../assets/icons-weather/sunrise1.png";
import sunset from "../assets/icons-weather/sunset1.png";

function changeKelvinToCelcius(number) {
  return Math.round(number - 273.15);
}
function changeKelvinToFahrenheit(number) {
  return Math.round(1.8 * Math.round(number - 273.15) + 32);
}
function getTimeFromUnix(unixTimestamp, timezone) {
  let date = new Date((unixTimestamp + timezone) * 1000);
  let hours = "0" + date.getUTCHours();
  let minutes = "0" + date.getUTCMinutes();
  return hours.slice(-2) + ":" + minutes.slice(-2);
}

function Weather({ data, isToggled }) {
  const weatherDetails = [
    {
      icon: wind,
      text: `${Math.round(data.wind.speed)}`,
      span: true,
      spanText: "m/s",
    },
    {
      icon: humidity,
      text: `${data.main.humidity}`,
      span: true,
      spanText: "%",
    },
    {
      icon: sunrise,
      text: `${getTimeFromUnix(data.sys.sunrise, data.timezone)}`,
      span: false,
    },
    {
      icon: sunset,
      text: `${getTimeFromUnix(data.sys.sunset, data.timezone)}`,
      span: false,
    },
  ];

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
          {isToggled
            ? `${changeKelvinToFahrenheit(data.main.temp)}°F`
            : `${changeKelvinToCelcius(data.main.temp)}°C`}
        </h1>
        <p className="weather__description">{data.weather[0].description}</p>
        <div className="weather__others">
          {weatherDetails.map((detail, index) => (
            <div className="weather__other" key={index}>
              <img
                className="weather__others-icon"
                src={detail.icon}
                alt="icon"
              ></img>
              <p className={`weather__others-detail`}>
                {detail.text}
                {detail.span ? <span>{detail.spanText}</span> : null}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export {
  changeKelvinToCelcius,
  changeKelvinToFahrenheit,
  getTimeFromUnix,
  Weather,
};
