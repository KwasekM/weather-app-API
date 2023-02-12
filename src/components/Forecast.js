import React from "react";

import {
  changeKelvinToCelcius,
  getTimeFromUnix,
  changeKelvinToFahrenheit,
} from "./Weather";

export function Forecast({
  hour,
  icon,
  description,
  temp,
  timezone,
  isToggled,
}) {
  const localTime = new Date(hour);
  const changedForUnixTimestamp = Math.floor(localTime.getTime() / 1000);

  return (
    <div className="forecast__element">
      <p className="forecast__hour">
        {getTimeFromUnix(changedForUnixTimestamp, timezone)}
      </p>
      <img
        className="forecast__icon"
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={{ description }}
      />
      <p className="forecast__temp">
        {isToggled
          ? `${changeKelvinToFahrenheit(temp)}°F`
          : `${changeKelvinToCelcius(temp)}°C`}
      </p>
    </div>
  );
}
