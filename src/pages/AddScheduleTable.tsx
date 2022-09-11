import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Button from "../layout/Button";
import { postSchedule } from "../api/api";
import { DayButton } from "../layout/DayButton";
import StartTime from "../components/addSchedule/StartTime";
import { ScheduleType } from "../types/ScheduleType";
import { TimeType } from "../types/TimeType";
import useOverlap from "../hooks/useOverlap";
import * as PageStyle from "../styles/pageStyle";

const AddScheduleTable = () => {
  // const [selectedTime, setSelectedTime] = React.useState<TimeType<string>>({
  //   hour: "00",
  //   minute: "00",
  // });
  const [selectedTime, setSelectedTime] = React.useState<TimeType<string>>({
    hour: "",
    minute: "",
  });
  /**
   * selectedTime값이 처음 없을 경우
   * 1. StartTime : 기본 값이 00으로 보이게 해야함 -> DONE
   * 2. useOverlap : weeklyScheduleBySelectedTime을 생성하면 안됨! 
   * => selectedTime이 없으면 weeklyScheduleBySelectedTime도 없음
   * -> weeklyScheduleBySelectedTime 없으면 DayButton mapping을 weeklyScheduleBySelectedTime로 하지 말고 다른 값으로 해야됨
   * -> newSchedule에 값이 추가되어서도 안됨
   */
  const { isOverlap, weeklyScheduleBySelectedTime } = useOverlap({
    selectedTime,
  });
  console.log(weeklyScheduleBySelectedTime);

  const [newSchedule, setNewSchedule] = React.useState<ScheduleType[]>([]);
  const handleSave = () => {
    newSchedule.forEach((schedule: ScheduleType) => {
      postSchedule(schedule);
    });
  };

  const [isDayClicked, setIsDayClicked] = React.useState<boolean[]>(
    new Array(7).fill(false)
  );
  const changeColor = (index: number) => {
    isDayClicked.splice(index, 1, !isDayClicked[index]);
    setIsDayClicked(isDayClicked.splice(0, 8).concat(isDayClicked));
  };

  return (
    <>
      <TitleContainer>
        <PageStyle.PageTitle>Add class schedule</PageStyle.PageTitle>
      </TitleContainer>
      <WhiteContainer>
        <Positioner>
          <SectionTitle>Start selectedTime</SectionTitle>
          <StartTime
            setSelectedTime={setSelectedTime}
            selectedTime={selectedTime}
          />
        </Positioner>
        <Positioner>
          <SectionTitle>Repeat on</SectionTitle>
          {weeklyScheduleBySelectedTime.map(
            (dailySchedule: ScheduleType, index: number) => {
              const dayOfWeek: Date = new Date(dailySchedule.startTime);
              return (
                <DayButton
                  key={index}
                  isClicked={isDayClicked[index]}
                  disabled={isOverlap[index]}
                  onClick={
                    () => {
                      const dateArray = newSchedule?.map(
                        (schedule: ScheduleType) => {
                          return schedule.date;
                        }
                      );
                      if (dateArray.includes(dayOfWeek.toLocaleDateString())) {
                        const FilteredSchedule = newSchedule.filter(
                          (schedule: ScheduleType) =>
                            schedule.date !== dayOfWeek.toLocaleDateString()
                        );
                        setNewSchedule(FilteredSchedule);
                      } else {
                        setNewSchedule([...newSchedule].concat(dailySchedule));
                      }
                      changeColor(index);
                    } //handleButtonClick
                  }
                >
                  {format(dayOfWeek, "EEEE")}
                </DayButton>
              );
            }
          )}
        </Positioner>
      </WhiteContainer>

      <ButtonContainer>
        <Link to="/">
          <Button onClick={handleSave}>Save</Button>
        </Link>
      </ButtonContainer>
    </>
  );
};

export default AddScheduleTable;

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
