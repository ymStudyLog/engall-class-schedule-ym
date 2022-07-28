import React from "react";
import Button from "../components/Button";
import { WeekdayContainer } from "../components/youmee/WeekdayContainer";
import { WhiteContainer } from "../components/youmee/WhiteContainer";
import styled from "styled-components";

type Props = {};

const WeeklySchedule = (props: Props) => {
  return (
    <WeeklyContainer>
      <TitleAndButton>
        <Title>Class schedule</Title>
        <Button>Add Class Schedule</Button>
      </TitleAndButton>
      <WhiteContainer>
        <WeekdayContainer>월</WeekdayContainer>
      </WhiteContainer>
    </WeeklyContainer>
  );
};

export default WeeklySchedule;

const WeeklyContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const TitleAndButton = styled.div`
  width: 95%;
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-family: var(--fontFamily--bold);
  font-size: var(--fontSize-root--large);
  display: flex;
  align-items: center;
`;