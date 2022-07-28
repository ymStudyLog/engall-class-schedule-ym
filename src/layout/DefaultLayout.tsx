import React from "react";
import { Outlet } from "react-router-dom";
import { Background } from "../components/youmee/Background";
import Header from "../components/youmee/Header";

type Props = {};

const DefaultLayout = (props: Props) => {
  return (
    <Background>
      <Header />
      <Outlet />
    </Background>
  );
};

export default DefaultLayout;
