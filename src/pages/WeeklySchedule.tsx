import Button from "../components/Button";
import { DailyContainer } from "../layout/DailyContainer";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { weekState, scheduleState } from "../store/weekAtom";
import { DayTitle } from "../layout/DayTitle";
import DailySchedule from "../components/DailySchedule";
import { postSchedule,deleteSchedule } from "../api/api";
import { PageContainer, PageTitle, ElementContainer } from "../styles/page.style";
import { ScheduleType } from "../types/ScheduleType";
import WEEK_ARRAY from "../utils/weekArray";

const WeeklySchedule = () => {
  const week = useRecoilValue<Date[]>(weekState);
  const schedule = useRecoilValue<ScheduleType[]>(scheduleState);

  //testPost, testDelete는 삭제 예정
  const testPost = () => {
    postSchedule({
      id:100,
      startTime:"10:00",
      endTime:"10:40",
      startTimeAMorPM : "AM",
      date:"2022. 7. 26."
    }).then(()=>console.log("post 성공"));
  }

  const testDelete = () => {
    deleteSchedule(100).then(() => console.log("delete 성공"));
  };

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
      <button onClick={testPost}>수업추가</button>
      <button onClick={testDelete}>수업삭제</button>
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
