import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { WhiteContainer } from "../layout/WhiteContainer";
import {
  PageContainer,
  PageTitle,
  ElementContainer,
} from "../styles/page.style";
import { areIntervalsOverlapping, addMinutes, getHours } from "date-fns";
import WEEK_ARRAY from "../utils/weekArray";
import { useRecoilValue } from "recoil";
import { weekState, scheduleState } from "../store/weekAtom";
import { DayButton } from "../layout/DayButton";
import MinDropDown from "../components/MinDropDown";
import { AmPmButton } from "../components/AmPmButton";
import { Link } from "react-router-dom";
import HourDropDown from "../components/HourDropDown";
import { postSchedule } from "../api/api";
import { ScheduleType } from "../types/ScheduleType";
import * as AddPage from "../styles/AddPage.styled";

type Props = {};

const AddSchedule = (props: Props) => {
  const [amPm, setAmPm] = React.useState("");
  const [isAmClicked, setIsAmClicked] = React.useState(false);
  const [isPmClicked, setIsPmClicked] = React.useState(false);
  const [hour, setHour] = React.useState("00");
  const [min, setMin] = React.useState("00");

  const changeHour = (value: string) => {
    setHour(value);
  };
  const changeMin = (value: string) => {
    setMin(value);
  };

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const startTime = new Date(
    year,
    month - 1,
    day,
    parseInt(hour),
    parseInt(min)
  );
  const endTime = addMinutes(startTime, 40);
  const endTimeAMorPM = getHours(endTime) >= 12 ? "PM" : "AM"; //이 값도 POST할때 같이 넣기
  const trueOrFalse = areIntervalsOverlapping(
    { start: startTime, end: endTime },
    { start: startTime, end: endTime }
  );

  const handleAmClick = () => {
    setAmPm("AM");
    setIsAmClicked(!isAmClicked);
    setIsPmClicked(false);
  };
  const handlePmClick = () => {
    setAmPm("PM");
    setIsPmClicked(!isPmClicked);
    setIsAmClicked(false);
  };
  const newStartTime = startTime.toString();
  const newEndTime = endTime.toString();

  const CreateSchedule = () => {
    postSchedule({
      id: parseInt(new Date().toUTCString()),
      startTime: newStartTime,
      endTime: newEndTime,
      startTimeAMorPM: `${amPm}`,
      endTimeAMorPM: endTimeAMorPM,
      date: new Date().toLocaleDateString(),
    }).then(() => console.log("post 성공"));
  };

  const week = useRecoilValue<Date[]>(weekState);
  const schedules = useRecoilValue<ScheduleType[]>(scheduleState);

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
              <HourDropDown changeHour={changeHour} hour={hour} />
              <AddPage.ColoneText>:</AddPage.ColoneText>
              <MinDropDown changeMin={changeMin} min={min} />
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
                onClick={() => {
                  console.log(day.toLocaleDateString());
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
          <Button onClick={CreateSchedule}>Save</Button>
        </Link>
      </AddPage.ButtonContainer>
    </PageContainer>
  );
};

export default AddSchedule;
