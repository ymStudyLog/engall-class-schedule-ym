import styled, { css } from "styled-components";

type Props = {
  children: React.ReactNode;
  isClicked: boolean;
  disabled: boolean;
  onClick: () => void;
};

const StyledButton = styled.button<{ isClicked: boolean; disabled: boolean }>`
  width: 150px;
  height: 45px;
  border: 1px solid;
  margin: 0 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.disabled
      ? css`
          background-color: var(--color-light-gray);
          color: var(--color-gray);
          border-color: var(--color-border);
          cursor: default;
        `
      : props.isClicked
      ? css`
          background-color: var(--color-blue);
          color: var(--color-white);
          border-color: var(--color-border);
        `
      : css`
          background-color: var(--color-white);
          color: var(--color-black);
          border-color: var(--color-dark-gray);
        `};
`;

const Day = styled.h1`
  font-family: "Karla", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
`;

export const DayButton = (props: Props) => (
  <StyledButton {...props}>
    <Day>{props.children}</Day>
  </StyledButton>
);
