import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { mondayToSunday } from "../store/atom";
import Button from "../layout/Button";
import ContainerWithLine from "../components/weeklySchedule/ContainerWithLine"
import { DayTitle } from "../layout/DayTitle";
import DailySchedule from "../components/weeklySchedule/DailySchedule";
import { PageTitle, FlexContainer } from "../styles/Page.styled";
import { ScheduleType } from "../types/ScheduleType";
import CALENDER_WEEK from "../utils/calenderWeek";
import useWeekSchedule from "../hooks/useWeekSchedule";

const WeeklySchedule = () => {
  const week = useRecoilValue<Date[]>(mondayToSunday);
  const { weekSchedule } = useWeekSchedule({ week });

  return (
    <>
      <TitleAndButtonContainer>
        <PageTitle>Class schedule</PageTitle>
        <Link to="/addschedule">
          <Button>Add Class Schedule</Button>
        </Link>
      </TitleAndButtonContainer>
      <ScheduleContainer>
        {week.map((dayOfWeek: Date, index: number) => {
          return (
            <ContainerWithLine key={index}>
              <DayTitle>{CALENDER_WEEK[dayOfWeek.getDay()]}</DayTitle>
              <DailySchedule
                dailySchedultData={weekSchedule.filter(
                  (eachSchedule: ScheduleType) =>
                    eachSchedule.date === dayOfWeek.toLocaleDateString()
                )}
              />
            </ContainerWithLine>
          );
        })}
      </ScheduleContainer>
    </>
  );
};

export default WeeklySchedule;

const TitleAndButtonContainer = styled(FlexContainer)`
  justify-content: space-between;
`;

const ScheduleContainer = styled.div`
  display: flex;
`;
