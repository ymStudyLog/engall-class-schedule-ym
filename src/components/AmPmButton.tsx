import React from "react";
import styled from "styled-components";

type AmPmBtnProps = {
  children: React.ReactNode;
  handleClick: () => void;
};

type AmPmTimeType = {
  onClick: () => void;
  isClicked: boolean;
  children: React.ReactNode;
};

const AmPmButton = (props: AmPmBtnProps) => {
  const [click, setClick] = React.useState(false);
  const handleButtonClick = () => {
    setClick(!click);
    //리코일에 AM PM 넣어두고 만약 클릭 value ==AM => console.log AM 이런식으로 ?

    console.log("AM||PM");
  };
  return (
    <AmPmTime onClick={handleButtonClick} isClicked={click}>
      {props.children}
    </AmPmTime>
  );
};

export default AmPmButton;

const StyledButton = styled.button<{ isClicked: boolean }>`
  width: 75px;
  height: 5x;
  font-size: 20px;
  background-color: ${(props) => (props.isClicked ? "#b4b4b4" : "#fff")};
  color: ${(props) => (props.isClicked ? "#fff" : "#b4b4b4")};
  border: 1px solid #b4b4b4;
`;

const AmPmTime = (props: AmPmTimeType) => (
  <StyledButton {...props}></StyledButton>
);
