import React from "react";

function BackgroundImage({
  src,
  id,
  selected,
  changeBackgroundImage,
  userBackgroundImage,
}) {
  return (
    <div
      className={`settings__img-container ${
        selected || userBackgroundImage === `image${id}.png`
          ? "settings__img-container--filter"
          : null
      }`}
      onClick={() => changeBackgroundImage(id)}
    >
      <img
        className="settings__img"
        src={require(`../assets/user-choice-backgrounds/${src}`)}
        alt="Background to choose"
      ></img>
    </div>
  );
}
export { BackgroundImage };
