import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./styles/GlobalStyle";
import Router from './router/Router';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <RecoilRoot>
    <React.StrictMode>
      <GlobalStyle />
      <Router />
    </React.StrictMode>
  </RecoilRoot>
);
