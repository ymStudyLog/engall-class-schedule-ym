import styled from "styled-components";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <Background>
      <Header>
      <Logo src={"./images/logo.png"} alt="Logo Img" />
      </Header>
      <Outlet />
    </Background>
  );
};

export default DefaultLayout;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f4f4f4;
`;

const Header = styled.div`
  width: 100%;
  height: 58px; 
  position: sticky;
  top: 0px;
  left: 0px;
  background: #44a7c8;
`;

const Logo = styled.img`
  width: 75px;
  height: 44px;
  position: absolute;
  left: 25px;
  bottom: 0px;
`;