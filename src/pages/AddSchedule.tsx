import React from "react";
import styled from "styled-components";
import Button from "../layout/Button";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { addMinutes } from "date-fns";
import { postSchedule } from "../api/api";
import { mondayToSunday } from "../store/atom";
import { DayButton } from "../layout/DayButton";
import StartTime from "../components/addSchedule/StartTime";
import CALENDER_WEEK from "../lib/calenderWeek";
import { ScheduleType } from "../types/scheduleType";
import { TimeType } from "../types/timeType";
import * as PageStyle from "../styles/pageStyle";

const CLASS_DURATION = 40;
const SCHEDULE_TEMPLATE = (
  id: number,
  startTime: string,
  endTime: string,
  date: string
): ScheduleType => {
  return {
    id: id,
    startTime: startTime,
    endTime: endTime,
    date: date,
  };
};

const AddSchedule = () => {
  const [time, setTime] = React.useState<TimeType<string>>({
    hour: "00",
    minute: "00",
  });

  //overlapping 함수를 위한 년월일 -> useWeekSchedule로 가능하지 않을까?
  const now: Date = new Date();
  const currentYear: number = now.getFullYear();
  const currentMonth: number = now.getMonth() + 1;
  const currentDate: number = now.getDate();

  const userStartTime = new Date(
    currentYear,
    currentMonth - 1,
    currentDate,
    parseInt(time.hour),
    parseInt(time.minute)
  );
  const userEndTime = addMinutes(userStartTime, CLASS_DURATION);
  const userStartTimeToString = userStartTime.toString();
  const userEndTimeToString = userEndTime.toString();

  const _id = React.useRef(4);
  const week = useRecoilValue<Date[]>(mondayToSunday);

  //여기서부터
  const [newSchedule, setNewSchedule] = React.useState<string[]>([]);
  const [isDayClicked, setIsDayClicked] = React.useState<boolean[]>(
    new Array(7).fill(false)
  );
  const changeColor = (index: number) => {
    isDayClicked.splice(index, 1, !isDayClicked[index]);
    setIsDayClicked(isDayClicked.splice(0, 8).concat(isDayClicked));
  };
  //여기까지 + TODO 표시해둔 부분 hooks로 묶어서 정리

  return (
    <>
      <TitleContainer>
        <PageStyle.PageTitle>Add class schedule</PageStyle.PageTitle>
      </TitleContainer>
      <WhiteContainer>
        <Positioner>
          <SectionTitle>Start time</SectionTitle>
          <StartTime setTime={setTime} time={time} />
        </Positioner>
        <Positioner>
          <SectionTitle>Repeat on</SectionTitle>
          {week.map((day: Date, index: number) => {
            return (
              <DayButton
                key={index}
                date={day.toLocaleDateString()}
                isClicked={isDayClicked[index]}
                onClick={() => {
                  //handleButtonClick
                  if (newSchedule.includes(day.toLocaleDateString())) {
                    newSchedule.splice(
                      newSchedule.indexOf(day.toLocaleDateString(), 1)
                    );
                    setNewSchedule(newSchedule);
                  } else {
                    setNewSchedule([...newSchedule, day.toLocaleDateString()]);
                  }
                  changeColor(index);
                }}
              >
                {CALENDER_WEEK[day.getDay()]}
              </DayButton>
            );
          })}
        </Positioner>
      </WhiteContainer>

      <ButtonContainer>
        <Link to="/">
          <Button
            onClick={() => {
              //handleSave
              newSchedule.forEach((schedule) => {
                postSchedule(
                  SCHEDULE_TEMPLATE(
                    _id.current,
                    userStartTimeToString,
                    userEndTimeToString,
                    schedule
                  )
                );
                _id.current += 1;
              });
            }}
          >
            Save
          </Button>
        </Link>
      </ButtonContainer>
    </>
  );
};

export default AddSchedule;

const WhiteContainer = styled.div`
  width: 95%;
  height: 340px;
  background: var(--color-white);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  position: relative;
`;

const TitleContainer = styled(PageStyle.PageContainer)`
  justify-content: flex-start;
`;

const ButtonContainer = styled(PageStyle.PageContainer)`
  justify-content: flex-end;
`;

const Positioner = styled.div`
  width: 95%;
  height: 150px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  margin-right: 25px;
  padding-left: 5px;
`;