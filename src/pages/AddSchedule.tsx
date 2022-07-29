import * as AddPage from "../styles/AddPage.styled";
import React from 'react';
import Button from '../components/Button';
import { WhiteContainer } from '../layout/WhiteContainer';
import { PageContainer, PageTitle, ElementContainer } from '../styles/page.style';
import { areIntervalsOverlapping, addMinutes, getHours } from 'date-fns';
import WEEK_ARRAY from '../utils/weekArray';
import { useRecoilValue } from 'recoil';
import { weekState, scheduleState } from '../store/weekAtom';
import { DayButton } from '../layout/DayButton';
import MinDropDown from '../components/MinDropDown';
import { AmPmButton } from '../components/AmPmButton';
import { Link } from 'react-router-dom';
import HourDropDown from '../components/HourDropDown';
import { postSchedule } from '../api/api';
import { ScheduleType } from '../types/ScheduleType';


type Props = {};

const AddSchedule = (props: Props) => {
  const [isAmClicked, setIsAmClicked] = React.useState(false);
  const [isPmClicked, setIsPmClicked] = React.useState(false);

  const [hour, setHour] = React.useState('00');
  const [min, setMin] = React.useState('00');

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

  console.log("year month day", year, month, day);
  console.log("hour", hour);
  console.log("min", min);

  const userStartTime = new Date(year, month - 1, day, parseInt(hour), parseInt(min));
  // const userStartTime = new Date(2022, 7, 30, 2, 0);

  const classDuration = 40;

  const userEndTime = addMinutes(userStartTime, classDuration);

  const week = useRecoilValue<Date[]>(weekState);

  const schedules = useRecoilValue<ScheduleType[]>(scheduleState);
  //console.log(schedules);

  const isOverlapping: boolean[] = schedules.map((schedule) => {
    const bookedStartTime = new Date(schedule.startTime);
    console.log(bookedStartTime);

    const bookedEndTime = addMinutes(bookedStartTime, classDuration);
    console.log(bookedEndTime);

    const trueOrFalse = areIntervalsOverlapping({ start: userStartTime, end: userEndTime }, { start: bookedStartTime, end: bookedEndTime });
    return trueOrFalse;
  });

  console.log(isOverlapping);

  const handleAmClick = () => {
    setIsAmClicked(!isAmClicked);
    setIsPmClicked(false);
  };

  const handlePmClick = () => {
    setHour((parseInt(hour) + 12).toString());
    setIsPmClicked(!isPmClicked);
    setIsAmClicked(false);
  };

  const userStartTimeToString = userStartTime.toString();
  const userEndTimeToString = userEndTime.toString();

  const CreateSchedule = () => {
    postSchedule({
      id: parseInt(new Date().toUTCString()),
      startTime: userStartTimeToString,
      endTime: userEndTimeToString,
      date: new Date().toLocaleDateString(),
    }).then(() => console.log('post 성공'));
  };

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
