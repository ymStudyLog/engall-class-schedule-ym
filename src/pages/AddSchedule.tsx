import React from "react";
import Button from "../layout/Button";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { addMinutes } from "date-fns";
import { postSchedule } from "../api/api";
import { WhiteContainer } from "../layout/WhiteContainer";
import { PageContainer, PageTitle } from "../styles/Page.style";
import { weekState } from "../store/atom";
import { DayButton } from "../layout/DayButton";
import MinDropDown from "../components/MinDropDown";
import { AmPmButton } from "../layout/AmPmButton";
import HourDropDown from "../components/HourDropDown";
import { ScheduleType } from "../types/ScheduleType";
import WEEK_ARRAY from "../utils/weekArray";
import * as AddPage from "../styles/AddPage.styled";

const _id = parseInt(new Date().toUTCString());
const CLASS_DURATION = 40;
const DATA_TEMPLATE = (
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
  const [isAmClicked, setIsAmClicked] = React.useState<boolean>(false);
  const [isPmClicked, setIsPmClicked] = React.useState<boolean>(false);
  const [hour, setHour] = React.useState<string>("00");
  const [minute, setMinute] = React.useState<string>("00");
  const [newSchedule, setNewSchedule] = React.useState<ScheduleType[]>([]);
  const [onButtonClicked, setOnButtonClicked] = React.useState<boolean[]>(
    new Array(7).fill(false)
  );

  const week = useRecoilValue<Date[]>(weekState);
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentDate = now.getDate();

  const userStartTime = new Date(
    currentYear,
    currentMonth - 1,
    currentDate,
    parseInt(hour),
    parseInt(minute)
  );
  const userEndTime = addMinutes(userStartTime, CLASS_DURATION);
  const userStartTimeToString = userStartTime.toString();
  const userEndTimeToString = userEndTime.toString();

  const handleAmClick = () => {
    setIsAmClicked(!isAmClicked);
    setIsPmClicked(false);
  };

  const handlePmClick = () => {
    setHour((parseInt(hour) + 12).toString());
    setIsPmClicked(!isPmClicked);
    setIsAmClicked(false);
  };

  const changeColor = (index: number) => {
    onButtonClicked.splice(index, 1, !onButtonClicked[index]);
    setOnButtonClicked(onButtonClicked.splice(0, 8).concat(onButtonClicked));
  };

  const handleSave = () =>{
    
  }

  return (
    <PageContainer>
      <AddPage.TitleContainer>
        <PageTitle>Add class schedule</PageTitle>
      </AddPage.TitleContainer>
      <WhiteContainer>
        <AddPage.StartTimeContainer>
          <AddPage.StartTimeText>Start time</AddPage.StartTimeText>
          <AddPage.DropDownContainer>
            <AddPage.HourMinContainer>
              <HourDropDown setHour={setHour} hour={hour} />
              <AddPage.ColoneText>:</AddPage.ColoneText>
              <MinDropDown setMinute={setMinute} minute={minute} />
            </AddPage.HourMinContainer>
            <AmPmButton onClick={handleAmClick} isClicked={isAmClicked}>
              AM
            </AmPmButton>
            <AmPmButton onClick={handlePmClick} isClicked={isPmClicked}>
              PM
            </AmPmButton>
          </AddPage.DropDownContainer>
        </AddPage.StartTimeContainer>

        <AddPage.Positioner>
          <AddPage.RepeatOnText>Repeat on</AddPage.RepeatOnText>
          {week.map((day: Date, index: number) => {
            return (
              <DayButton
                key={index}
                date={day.toLocaleDateString()}
                isClicked={onButtonClicked[index]}
                onClick={() => {
                  setNewSchedule([
                    ...newSchedule,
                    DATA_TEMPLATE(
                      _id,
                      userStartTimeToString,
                      userEndTimeToString,
                      day.toLocaleDateString()
                    ),
                  ]);
                  changeColor(index);
                }}
              >
                {WEEK_ARRAY[day.getDay()]}
              </DayButton>
            );
          })}
        </AddPage.Positioner>
      </WhiteContainer>
      <AddPage.ButtonContainer>
        <Link to="/">
          <Button
            onClick={() => {
              newSchedule.forEach((schedule) => {
                postSchedule(schedule);
              });
            }}
          >
            Save
          </Button>
        </Link>
      </AddPage.ButtonContainer>
    </PageContainer>
  );
};

export default AddSchedule;
