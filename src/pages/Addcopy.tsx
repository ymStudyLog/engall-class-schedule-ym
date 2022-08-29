import React from 'react';
import styled from "styled-components";
import Button from '../layout/Button';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { addMinutes } from 'date-fns';
import { postSchedule } from '../api/api';
import { PageTitle } from '../styles/Page.styled';
import { mondayToSunday } from '../store/atom';
import { DayButton } from '../layout/DayButton';
import MinDropDown from '../components/MinDropDown';
import HourDropDown from '../components/HourDropDown';
import { ScheduleType } from '../types/ScheduleType';
import CALENDER_WEEK from '../utils/calenderWeek';
import { FlexContainer } from '../styles/Page.styled';

const CLASS_DURATION = 40;
const SCHEDULE_TEMPLATE = (id: number, startTime: string, endTime: string, date: string): ScheduleType => {
  return {
    id: id,
    startTime: startTime,
    endTime: endTime,
    date: date,
  };
};

type AmPmButtonType = {
  am: boolean,
  pm: boolean
}

const Addcopy = () => {
  // const [isAmClicked, setIsAmClicked] = React.useState<boolean>(false);
  // const [isPmClicked, setIsPmClicked] = React.useState<boolean>(false);

  const [isAmPmClicked, setIsAmPmClicked] = React.useState<AmPmButtonType>({
    am: false,
    pm: false,
  });

  const [hour, setHour] = React.useState<string>('00');
  const [minute, setMinute] = React.useState<string>('00');

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentDate = now.getDate();

  const userStartTime = new Date(currentYear, currentMonth - 1, currentDate, parseInt(hour), parseInt(minute));
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

  const _id = React.useRef(4);
  const week = useRecoilValue<Date[]>(mondayToSunday);
  
  //여기서부터
  const [newSchedule, setNewSchedule] = React.useState<string[]>([]);
  const [isDayClicked, setIsDayClicked] = React.useState<boolean[]>(new Array(7).fill(false));
  const changeColor = (index: number) => {
    isDayClicked.splice(index, 1, !isDayClicked[index]);
    setIsDayClicked(isDayClicked.splice(0, 8).concat(isDayClicked));
  };
  //여기까지 + TODO 표시해둔 부분 hooks로 묶어서 정리

  return (
    <>
      <TitleContainer>
        <PageTitle>Add class schedule</PageTitle>
      </TitleContainer>

      <WhiteContainer>
        <Positioner>
          <SectionTitle>Start time</SectionTitle>
          
          <DropDownContainer>
            <HourMinContainer>
              <HourDropDown setHour={setHour} hour={hour} />
              <ColoneText>:</ColoneText>
              <MinDropDown setMinute={setMinute} minute={minute} />
            </HourMinContainer>
            
            <AmPmButton onClick={handleAmClick} isClicked={isAmClicked}>
              AM
            </AmPmButton>
            <AmPmButton onClick={handlePmClick} isClicked={isPmClicked}>
              PM
            </AmPmButton>
          
          </DropDownContainer>

        </Positioner>
        
        <Positioner>
          <SectionTitle>Repeat on</SectionTitle>
          {week.map((day: Date, index: number) => {
            return (
              <DayButton
                key={index}
                date={day.toLocaleDateString()}
                isClicked={isDayClicked[index]}
                onClick={() => { //handleButtonClick
                  if (newSchedule.includes(day.toLocaleDateString())) {
                    newSchedule.splice(newSchedule.indexOf(day.toLocaleDateString(), 1));
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
        <Link to='/'>
          <Button
            onClick={() => { //handleSave
              newSchedule.forEach((schedule) => {
                postSchedule(SCHEDULE_TEMPLATE(_id.current, userStartTimeToString, userEndTimeToString, schedule));
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

export default Addcopy;

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

const TitleContainer = styled(FlexContainer)`
  justify-content: flex-start;
`;

const ButtonContainer = styled(FlexContainer)`
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
//
const DropDownContainer = styled.div`
  width: 350px;
  display: flex;
  justify-content: space-around;
`;

const ColoneText = styled.div`
  position: absolute;
  bottom: 17px;
  left: 77px;
`;

const HourMinContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 160px;
  position: relative;
`;

const AmPmButton = styled.button<{ isClicked: boolean }>`
  width: 75px;
  height: 50px;
  font-size: 20px;
  background-color: ${(props) =>
    props.isClicked ? `var(--color-gray)` : "var(--color-white)"};
  color: ${(props) =>
    props.isClicked ? "var(--color-white)" : `var(--color-gray)`};
  border: 1px solid var(--color-border);
`;