import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { format } from "date-fns";
import { mondayToSunday } from "../store/atom";
import Button from "../layout/Button";
import ScheduleByDay from "../components/weeklySchedule/ScheduleByDay";
import useWeekSchedule from "../hooks/useWeekSchedule";
import { ScheduleType } from "../types/scheduleType";
import * as PageStyle from "../styles/pageStyle";

const WeeklySchedule = () => {
  const week = useRecoilValue<Date[]>(mondayToSunday);
  const { weekSchedule, getWeeklySchedule } = useWeekSchedule({ week });

  React.useEffect(()=>{
    getWeeklySchedule();
  },[getWeeklySchedule]); //무한 getWeeklySchedule 중

  return (
    <>
      <TitleAndButtonContainer>
        <PageStyle.PageTitle>Class schedule</PageStyle.PageTitle>
        <Link to="/addschedule">
          <Button>Add Class Schedule</Button>
        </Link>
      </TitleAndButtonContainer>
      <DailyScheduleContainer>
        {week.map((dayOfWeek: Date, index: number) => {
          return (
            <DailySchedule key={index}>
              <HorizontalLine />
              <DayTitle>{format(dayOfWeek,"EEEE")}</DayTitle>
              <ScheduleByDay
                dailySchedultData={weekSchedule.filter(
                  (eachSchedule: ScheduleType) =>
                    eachSchedule.date === dayOfWeek.toLocaleDateString()
                )}
              />
            </DailySchedule>
          );
        })}
      </DailyScheduleContainer>
    </>
  );
};

export default WeeklySchedule;

const TitleAndButtonContainer = styled(PageStyle.PageContainer)`
  justify-content: space-between;
`;

const DailyScheduleContainer = styled.div`
  display: flex;
`;

const DailySchedule = styled.div`
  position: relative;
  width: 185.3px;
  min-height: 340px;
  padding-top: 20px;
  background: var(--color-white);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const HorizontalLine = styled.div`
  position: absolute;
  width: inherit;
  text-align: center;
  border-bottom: 1px solid var(--color-border);
  top: 40px;
`;

const DayTitle = styled.h1`
  font-family: "Karla", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
`;
