import React from "react";
import styled from "styled-components";
import Button from "../layout/Button";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { addMinutes, format } from "date-fns";
import { postSchedule } from "../api/api";
import { mondayToSunday } from "../store/atom";
import { DayButton } from "../layout/DayButton";
import StartTime from "../components/addSchedule/StartTime";
import { ScheduleType } from "../types/scheduleType";
import { TimeType } from "../types/timeType";
import * as PageStyle from "../styles/pageStyle";
import useOverlap from "../hooks/useOverlap";

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
  const _id = React.useRef(6);
  const week = useRecoilValue<Date[]>(mondayToSunday);
  const [time, setTime] = React.useState<TimeType<string>>({
    hour: "00",
    minute: "00",
  });
  const { fakeSchedule } = useOverlap({time});

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
          {week.map((dayOfWeek: Date, index: number) => {
            return (
              <DayButton
                key={index}
                date={dayOfWeek.toLocaleDateString()}
                isClicked={isDayClicked[index]}
                onClick={() => {
                  //handleButtonClick
                  if (newSchedule.includes(dayOfWeek.toLocaleDateString())) {
                    newSchedule.splice(
                      newSchedule.indexOf(dayOfWeek.toLocaleDateString(), 1)
                    );
                    setNewSchedule(newSchedule);
                  } else {
                    setNewSchedule([...newSchedule, dayOfWeek.toLocaleDateString()]);
                  }
                  changeColor(index);
                }}
              >
                {format(dayOfWeek, "EEEE")}
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
                    "Sun Sep 04 2022 18:40:00 GMT+0900 (한국 표준시)", //임시
                    "Sun Sep 04 2022 19:20:00 GMT+0900 (한국 표준시)", //임시
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