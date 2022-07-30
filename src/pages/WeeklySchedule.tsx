import React from  "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { weekState, scheduleState } from "../store/atom";
import Button from "../layout/Button";
import { DailyContainer } from "../layout/DailyContainer";
import { DayTitle } from "../layout/DayTitle";
import DailySchedule from "../components/DailySchedule";
import {
  PageContainer,
  PageTitle,
  ElementContainer,
} from "../styles/Page.style";
import { ScheduleType } from "../types/ScheduleType";
import WEEK_ARRAY from "../utils/weekArray";
import useSchedule from "../hooks/useSchedule";

const WeeklySchedule = () => {
  const week = useRecoilValue<Date[]>(weekState);
  const schedule = useRecoilValue<ScheduleType[]>(scheduleState);
  const { getWeeklySchedule } = useSchedule();

  React.useEffect(()=>{
    getWeeklySchedule();
  },[]); //TODO : dependency -> hooks 처리 되면 삭제 예정
  
  console.log(schedule);
  return (
    <PageContainer>
      <TitleAndButtonContainer>
        <PageTitle>Class schedule</PageTitle>
        <Link to="/addschedule">
          <Button>Add Class Schedule</Button>
        </Link>
      </TitleAndButtonContainer>
      <MainContainer>
        {week.map((day: Date, index: number) => {
          return (
            <DailyContainer key={index}>
              <DayTitle>{WEEK_ARRAY[day.getDay()]}</DayTitle>
              <DailySchedule
                dailySchedultData={schedule.filter(
                  (each) => each.date === day.toLocaleDateString()
                )}
              />
            </DailyContainer>
          );
        })}
      </MainContainer>
    </PageContainer>
  );
};

export default WeeklySchedule;

const TitleAndButtonContainer = styled(ElementContainer)`
  justify-content: space-between;
`;

const MainContainer = styled.div`
  display: flex;
`;
