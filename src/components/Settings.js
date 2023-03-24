import React, { useState } from "react";
import { Link } from "react-router-dom";

import { nanoid } from "nanoid";

import { BackgroundImage } from "./BackgroundImage";
import dataBackgrounds from "../data/dataBackgrounds";

function Settings({
  isToggled,
  setIsToggled,
  getDefaultCity,
  inputDefaultCityRef,
  setUserBackgroundImage,
  userBackgroundImage,
}) {
  const [backgroundsToChoose, setBackgroundsToChoose] =
    useState(dataBackgrounds);

  function changeBackgroundImage(id) {
    const newArray = backgroundsToChoose.map((item) => {
      if (item.id === id) {
        setUserBackgroundImage(`image${item.id}.png`);
        return { ...item, selected: true };
      }
      return { ...item, selected: false };
    });
    setBackgroundsToChoose(newArray);
  }
  function settingsHandleSubmit(e) {
    e.preventDefault();
    if (inputDefaultCityRef.current.value) {
      getDefaultCity(e);
    }
  }

  const backgroundsElements = backgroundsToChoose.map((item) => (
    <BackgroundImage
      userBackgroundImage={userBackgroundImage}
      src={item.src}
      id={item.id}
      selected={item.selected}
      changeBackgroundImage={changeBackgroundImage}
      key={nanoid()}
    />
  ));

  return (
    <div className="settings">
      <Link to="/">
        <i className="settings__x-mark icon  fa-solid fa-xmark "></i>
      </Link>

      <div className="settings__default-city">
        <p className="settings__para">Default city:</p>
        <div className="settings__form-container form-container">
          <form className="settings__form form" onSubmit={settingsHandleSubmit}>
            <i className="settings__icon form-icon fa-solid fa-earth-americas "></i>
            <input
              className="settings__input form-input"
              type="text"
              ref={inputDefaultCityRef}
            ></input>
            <button type="submit" className="settings__btn form-btn">
              Change
            </button>
          </form>
          <p className="settings__error-message form-error">Invalid city</p>
        </div>
      </div>

      <div className="settings__temperature">
        <p className="settings__para">Temperature unit:</p>
        <label className="settings__label" htmlFor="myToggle">
          <input
            className="settings__toggle-input"
            type="checkbox"
            checked={isToggled}
            onChange={() => {
              setIsToggled(!isToggled);
            }}
            id="myToggle"
          ></input>
          <div className="settings__toggle-fill"></div>
        </label>
      </div>
      <div>
        <p className="settings__para">Change background:</p>
        <div className="settings__backgrounds-to-choose">
          {backgroundsElements}
        </div>
      </div>
    </div>
  );
}
export { Settings };
