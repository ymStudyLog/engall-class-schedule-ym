import styled from "styled-components";
import { DayTitle } from "./DayTitle";

type Props = {
  children: React.ReactNode;
  date: string;
  isClicked: boolean;
  onClick: () => void;
};

const DayButtonDiv = styled.div<{ isClicked: boolean }>`
  width: 150px;
  height: 45px;
  border: 1px solid var(--color-border);
  margin: 0 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) =>
    props.isClicked ? `var(--color-border)` : `var(--color-white)`};
  color: ${(props) =>
    props.isClicked ? `var(--color-white)` : `var(--color-black)`};
`;

export const DayButton = (props: Props) => (
  <DayButtonDiv {...props}>
    <DayTitle>{props.children}</DayTitle>
  </DayButtonDiv>
);
