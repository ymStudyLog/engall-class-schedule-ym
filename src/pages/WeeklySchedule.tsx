import React from "react";
import Button from "../components/Button";
import { DailyContainer } from "../layout/DailyContainer";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { weekState } from "../store/weekAtom";
import { DayTitle } from "../layout/DayTitle";
import DailySchedule from "../components/DailySchedule";
import { postSchedule } from "../api/api";
import { deleteSchedule } from "../api/api";
import {
  PageContainer,
  PageTitle,
  ElementContainer,
} from "../styles/page.style";

type Props = {};

const fullWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const WeeklySchedule = (props: Props) => {
  const week = useRecoilValue<Date[]>(weekState);

  //testPost, testDelete는 삭제 예정
  const testPost = () => {
    postSchedule({
      id: 100,
      startTime: "10:00",
      endTime: "10:40",
      startTimeAMorPM: "AM",
      date: "2022. 7. 26.",
    }).then(() => console.log("post 성공"));
  };

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
          // console.log(index, fullWeek[day.getDay()], day);
          return (
            <DailyContainer key={index}>
              <DayTitle>{fullWeek[day.getDay()]}</DayTitle>
              <DailySchedule date={day.toLocaleDateString()} />
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
