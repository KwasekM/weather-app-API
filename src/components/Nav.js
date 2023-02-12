import React from "react";

export default function Nav({ navHandleSubmit, handleChange, city, error }) {
  const styles = {
    border: `3px solid rgba(255, 99, 71, 1)`,
    display: `block`,
  };
  return (
    <div className="form-container">
      <form
        className="form-container__form form"
        onSubmit={navHandleSubmit}
        style={error ? { border: styles.border } : null}
      >
        <i className="form-container__icon form-icon fa-solid fa-magnifying-glass "></i>
        <input
          className="form-container__input form-input"
          onChange={handleChange}
          value={city}
          type="text"
        ></input>
        <button className="form-container__btn form-btn" type="submit">
          Search
        </button>
      </form>
      <p
        className="form-container__error-message form-error"
        style={error ? { display: styles.display } : null}
      >
        Invalid city
      </p>
    </div>
  );
}
