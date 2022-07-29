import styled from "styled-components";
import { DayTitle } from "./DayTitle";

type Props = {
  children: React.ReactNode;
  date: string;
  onClick: ()=>void;
};

const DayButtonDiv = styled.div`
  width: 150px;
  height: 45px;
  background: #ffffff;
  border: 1px solid #b4b4b4;
  margin: 0 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DayButton = (props: Props) => (
  <DayButtonDiv {...props}>
    <DayTitle>{props.children}</DayTitle>
  </DayButtonDiv>
);