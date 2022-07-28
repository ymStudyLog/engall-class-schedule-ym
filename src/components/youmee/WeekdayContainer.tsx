import styled from "styled-components";

type Props = {
    children: React.ReactNode;
}

const WeekdayContainerDiv = styled.div`
  width: 195px; 
  min-height: 340px;
  background: #ffffff;
  display: flex;
  justify-content:center;
  align-items: flex-start;
`;

export const WeekdayContainer = (props: Props) => <WeekdayContainerDiv>{props.children}</WeekdayContainerDiv>