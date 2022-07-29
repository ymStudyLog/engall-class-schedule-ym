import React from 'react';
import styled from 'styled-components';
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

  //const userStartTime = new Date(year, month - 1, day, parseInt(hour), parseInt(min));
  const userStartTime = new Date(2022, 7, 30, 2, 0);

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

  const testPost2 = () => {
    postSchedule({
      id: parseInt(new Date().toUTCString()),
      startTime: userStartTimeToString,
      endTime: userEndTimeToString,
      date: new Date().toLocaleDateString(),
    }).then(() => console.log('post 성공'));
  };

  return (
    <PageContainer>
      <TitleContainer>
        <PageTitle>Add class schedule</PageTitle>
      </TitleContainer>
      <WhiteContainer>
        <StartTimeContainer>
          <StartTimeText>
            <p>Start time</p>
          </StartTimeText>
          <DropDownContainer>
            <HourDropDown changeHour={changeHour} hour={hour} />
            <MinDropDown changeMin={changeMin} min={min} />
            <AmPmButton onClick={handleAmClick} isClicked={isAmClicked}>
              AM
            </AmPmButton>
            <AmPmButton onClick={handlePmClick} isClicked={isPmClicked}>
              PM
            </AmPmButton>
          </DropDownContainer>
        </StartTimeContainer>

        <Positioner>
          <RepeatOnText>Repeat on</RepeatOnText>
          {week.map((day: Date, index: number) => {
            return (
              <DayButton
                key={index}
                date={day.toLocaleDateString()}
                onClick={() => {
                  //console.log(day.toLocaleDateString());
                  // onClick시 버튼안에 있는 date를 post 할 데이터에 추가하는 로직 여기에
                }}
              >
                {WEEK_ARRAY[day.getDay()]}
              </DayButton>
            );
          })}
        </Positioner>
      </WhiteContainer>
      <ButtonContainer>
        <Link to='/'>
          <Button onClick={testPost2}>Save</Button>
        </Link>
      </ButtonContainer>
    </PageContainer>
  );
};

export default AddSchedule;

const TitleContainer = styled(ElementContainer)`
  justify-content: flex-start;
`;

const ButtonContainer = styled(ElementContainer)`
  justify-content: flex-end;
`;

const Positioner = styled.div`
  display: flex;
`;

const StartTimeContainer = styled.div`
  width: 100%;
  height: 100px;
  margin-left: 36px;
  display: flex;
  flex-direction: row;
`;
const RepeatContainer = styled.div`
  width: 100%;
  height: 100px;
  margin-left: 36px;
`;

const DropDownContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  justify-content: space-around;
  width: 350px;
  margin-top: 40px;
`;

const StartTimeText = styled.div`
  margin-top: 54px;
`;

const ColoneText = styled.div`
  position: absolute;
  /* top: 205px;
  left: 250px; */
`;

const RepeatOnText = styled.div`
  display: flex;
  align-items: center;
  margin-right: 25px;
  padding-left: 5px;
`;
