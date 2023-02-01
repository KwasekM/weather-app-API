import React from "react";

export default function Nav({ handleSubmit, handleChange, city, error }) {
  const styles = {
    border: `3px solid rgba(255, 99, 71, 1)`,
    display: `block`,
  };
  return (
    <div className="form-container">
      <form
        className="form-container__form"
        onSubmit={handleSubmit}
        style={error ? { border: styles.border } : null}
      >
        <i className="form-container__icon fa-solid fa-magnifying-glass "></i>
        <input
          className="form-container__input"
          onChange={handleChange}
          value={city}
          type="text"
        ></input>
        <button className="form-container__btn" type="submit">
          Search
        </button>
      </form>
      <p
        className="form-container__error-message"
        style={error ? { display: styles.display } : null}
      >
        Invalid city
      </p>
    </div>
  );
}
