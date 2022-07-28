import React from "react";
import styled from "styled-components";

type AmPmBtnProps = {
  children: React.ReactNode;
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
  height: 50px;
  font-size: 20px;
  background-color: ${(props) => (props.isClicked ? "#b4b4b4" : "#fff")};
  color: ${(props) => (props.isClicked ? "#fff" : "#b4b4b4")};
`;

const AmPmTime = (props: AmPmTimeType) => (
  <StyledButton {...props}></StyledButton>
);

