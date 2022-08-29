import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./styles/GlobalStyle";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <RecoilRoot>
    <React.StrictMode>
      <GlobalStyle />
      <App />
    </React.StrictMode>
  </RecoilRoot>
);
