import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset}

* {
 box-sizing: border-box;
}

html {
  font-family: var(--fontFamily);
  font-size: var(--fontSize-root--normal);
  line-height: 23.38px;
  word-break: keep-all;

  * {
      -ms-overflow-style: none; 
      scrollbar-width: none; 
      ::-webkit-scrollbar {
        display: none; 
      }
    }
}

body, html, #root {
  width: 100%;
  height: 100%;
}


button {
  cursor: pointer;
  border: none;
  outline: none;
}

:root {
    --fontFamily: Karla-light;
    --fontFamily--bold: Karla;
    --fontSize-root--large: 30px;
    --fontSize-root--normal: 20px;
    --color-border: #b4b4b4;
    --color-white: #fff;
    --color-blue:#3175d8;
    --color-black: #000
    --color-dark-gray: #959595;
    --color-middle-gray: #747474;
  }

  @font-face {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 500;
  src: url('https://fonts.gstatic.com/s/karla/v23/qkBIXvYC6trAT55ZBi1ueQVIjQTDypqaE0lKZbLXGhmR.woff2') format('woff2');
}

@font-face {
  font-family: 'Karla-light';
  font-style: normal;
  font-weight: 400;
  src: url('https://fonts.gstatic.com/s/karla/v23/qkBIXvYC6trAT55ZBi1ueQVIjQTD-JqaHUlKd7c.woff2%27') format('woff2');
}

`;

export default GlobalStyle;
