import Button from "../components/Button";
import { DailyContainer } from "../layout/DailyContainer";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { weekState, scheduleState } from "../store/weekAtom";
import { DayTitle } from "../layout/DayTitle";
import DailySchedule from "../components/DailySchedule";
import { PageContainer, PageTitle, ElementContainer } from "../styles/page.style";
import { ScheduleType } from "../types/ScheduleType";
import WEEK_ARRAY from "../utils/weekArray";

const WeeklySchedule = () => {
  const week = useRecoilValue<Date[]>(weekState);
  const schedule = useRecoilValue<ScheduleType[]>(scheduleState);

  return (
    <PageContainer>
      <TitleAndButtonContainer>
        <PageTitle>Class schedule</PageTitle>
        <Button>Add Class Schedule</Button>
      </TitleAndButtonContainer>
      <MainContainer>
        {week.map((day: Date, index: number) => {
          return (
            <DailyContainer key={index}>
              <DayTitle>{WEEK_ARRAY[day.getDay()]}</DayTitle>
              <DailySchedule dailyData={schedule.filter((each)=>(each.date === day.toLocaleDateString()))} />
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
