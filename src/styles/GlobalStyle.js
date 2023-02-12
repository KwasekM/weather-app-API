import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-image:${(props) =>
      `url(${require(`../assets/mobile-backgrounds/${props.userBackgroundImage}`)})`}
   
  }
  @media (min-width: 640px) {
    body {
        background-image:${(props) =>
          `url(${require(`../assets/desktop-backgrounds/${props.userBackgroundImage}`)})`}

      }
  }
  `;
export { GlobalStyle };
