import styled from "styled-components";

type Props = {
    children: React.ReactNode;
}

export const DailyContainerDiv = styled.div`
  width: 185.3px; //원래 = 195px 
  min-height: 340px;
  background: #ffffff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

export const DailyContainer = (props: Props) => <DailyContainerDiv>{props.children}</DailyContainerDiv>