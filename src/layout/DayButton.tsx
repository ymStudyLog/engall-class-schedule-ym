import styled, { css } from "styled-components";

type Props = {
  children: React.ReactNode;
  date: string;
  isClicked: boolean;
  onClick: () => void;
};

const DayButtonDiv = styled.div<{ isClicked: boolean }>`
  width: 150px;
  height: 45px;
  border: 1px solid;
  margin: 0 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.isClicked
      ? css`
          background-color: var(--color-light-gray);
          color: var(--color-gray);
          border-color: var(--color-border);
        `
      : css`
          background-color: var(--color-white);
          color: var(--color-black);
          border-color: var(--color-dark-gray);
          cursor: pointer;
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
  <DayButtonDiv {...props}>
    <Day>{props.children}</Day>
  </DayButtonDiv>
);
