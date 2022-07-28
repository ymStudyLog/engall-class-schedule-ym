import styled from "styled-components";

type Props = {}

const Header = (props: Props) => {
  return (
    <Navbar>
      <Logo src={"./images/logo.png"} alt="Logo Img" />
    </Navbar>
  );
};

export default Header;

const Navbar = styled.div`
  width: 100%;
  height: 58px; //height 값 그대로 가져오지 않고 화면에서 차지하는 비율 참고해서 커스텀함
  position: sticky; //sticky를 사용해야 헤더 부분이 제외된 빈 공간에 다른 요소들이 자연스럽게 배치됨
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