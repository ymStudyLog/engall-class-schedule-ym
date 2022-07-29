import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

export const DailyContainerDiv = styled.div`
  position: relative;
  width: 185.3px;
  min-height: 340px;
  padding-top: 20px;
  background: #ffffff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const HorizontalLine = styled.div`
  position: absolute;
  width: inherit;
  text-align: center;
  border-bottom: 1px solid #b4b4b4;
  top: 40px;
`;

export const DailyContainer = (props: Props) => (
  <DailyContainerDiv>
    <HorizontalLine />
    {props.children}
  </DailyContainerDiv>
);
