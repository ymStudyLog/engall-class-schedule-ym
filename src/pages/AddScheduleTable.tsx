import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Button from "../layout/Button";
import { postSchedule } from "../api/api";
import { DayButton } from "../layout/DayButton";
import Days from "../layout/Days";
import StartTime from "../components/addSchedule/StartTime";
import { ScheduleType } from "../types/ScheduleType";
import { TimeType } from "../types/TimeType";
import useOverlap from "../hooks/useOverlap";
import * as PageStyle from "../styles/pageStyle";

const AddScheduleTable = () => {
  const {
    isOverlap,
    weeklyScheduleBySelectedTime,
    createWeeklyScheduleBySelectedTime,
  } = useOverlap();
  const [selectedTime, setSelectedTime] = React.useState<TimeType<string>>({
    hour: "",
    minute: "",
  });

  React.useEffect(() => {
    if (selectedTime.hour.length > 0) {
      if (selectedTime.minute.length > 0) {
        createWeeklyScheduleBySelectedTime({
          hour: selectedTime.hour,
          minute: selectedTime.minute,
        });
      } else {
        createWeeklyScheduleBySelectedTime({
          hour: selectedTime.hour,
          minute: "00",
        });
      }
    } else {
      if (selectedTime.minute.length > 0) {
        createWeeklyScheduleBySelectedTime({hour:"00", minute:selectedTime.minute});
      } else {
        return;
      }
    }
  }, [selectedTime, createWeeklyScheduleBySelectedTime]);

  //TODO 여기서부터 
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
  //여기까지 + handleDayButtonClick 함수까지 useDayButton hook으로 빼기 

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
          {selectedTime.hour.length > 0 && selectedTime.minute.length > 0 ? (
            weeklyScheduleBySelectedTime.map(
              (dailySchedule: ScheduleType, index: number) => {
                const dayOfWeek: Date = new Date(dailySchedule.startTime);
                return (
                  <DayButton
                    key={index}
                    isClicked={isDayClicked[index]}
                    disabled={isOverlap[index]}
                    onClick={
                      //handleButtonClick
                      () => {
                        const dateArray = newSchedule?.map(
                          (schedule: ScheduleType) => {
                            return schedule.date;
                          }
                        );
                        if (
                          dateArray.includes(dayOfWeek.toLocaleDateString())
                        ) {
                          const FilteredSchedule = newSchedule.filter(
                            (schedule: ScheduleType) =>
                              schedule.date !== dayOfWeek.toLocaleDateString()
                          );
                          setNewSchedule(FilteredSchedule);
                        } else {
                          setNewSchedule(
                            [...newSchedule].concat(dailySchedule)
                          );
                        }
                        changeColor(index);
                      }
                    }
                  >
                    {format(dayOfWeek, "EEEE")}
                  </DayButton>
                );
              }
            )
          ) : (
            <Days />
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
