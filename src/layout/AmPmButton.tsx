import styled from "styled-components";

export const AmPmButton = styled.button<{ isClicked: boolean }>`
  width: 75px;
  height: 5x;
  font-size: 20px;
  background-color: ${(props) =>
    props.isClicked ? `var(--color-gray)` : "var(--color-white)"};
  color: ${(props) =>
    props.isClicked ? "var(--color-white)" : `var(--color-gray)`};
  border: 1px solid var(--color-border);
`;
