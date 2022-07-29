import styled from "styled-components";

export const AmPmButton = styled.button<{ isClicked: boolean }>`
  width: 75px;
  height: 5x;
  font-size: 20px;
  background-color: ${(props) => (props.isClicked ? "#b4b4b4" : "#fff")};
  color: ${(props) => (props.isClicked ? "#fff" : "#b4b4b4")};
  border: 1px solid #b4b4b4;
`;
