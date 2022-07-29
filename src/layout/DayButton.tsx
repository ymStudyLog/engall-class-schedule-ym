import styled from "styled-components";
import { DayTitle } from "./DayTitle";

type Props = {
  children: React.ReactNode;
};

const DayButtonDiv = styled.div`
  width: 160px;
  height: 50px;
  background: #ffffff;
  border: 1px solid #b4b4b4;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DayButton = (props: Props) => (
  <DayButtonDiv {...props}>
    <DayTitle>{props.children}</DayTitle>
  </DayButtonDiv>
);
