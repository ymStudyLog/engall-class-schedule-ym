import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Button from "../layout/Button";
import { postSchedule } from "../api/api";
import { DayButton } from "../layout/DayButton";
import StartTime from "../components/addSchedule/StartTime";
import { ScheduleType } from "../types/scheduleType";
import { TimeType } from "../types/timeType";
import useOverlap from "../hooks/useOverlap";
import * as PageStyle from "../styles/pageStyle";

const AddScheduleTable = () => {
  const [newSchedule, setNewSchedule] = React.useState<ScheduleType[]>([]);
  const [selectedTime, setSelectedTime] = React.useState<TimeType<string>>({
    hour: "00",
    minute: "00",
  }); //기본값을 빈문자열로 바꾸고 StartTime에서 로직 수정해서 처음 렌더링시에는 00보이게 하기
  const { isOverlap, weeklyScheduleBySelectedTime } = useOverlap({
    selectedTime,
  });

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
                  onClick={() => {
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
          <Button
            onClick={() => {
              newSchedule.forEach((schedule: ScheduleType) => {
                postSchedule(schedule); //handleSave
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
