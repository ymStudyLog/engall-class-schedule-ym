import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { WhiteContainer } from "../layout/WhiteContainer";

import {
  PageContainer,
  PageTitle,
  ElementContainer,
} from "../styles/page.style";
import { areIntervalsOverlapping, addMinutes } from "date-fns";
import WEEK_ARRAY from "../utils/weekArray";
import { useRecoilValue } from "recoil";
import { weekState } from "../store/weekAtom";
import { DayButton } from "../layout/DayButton";
import MinDropDown from "../components/MinDropDown";
import { AmPmButton } from "../components/AmPmButton";
import { Link } from "react-router-dom";
import HourDropDown from "../components/HourDropDown";

type Props = {};

const AddSchedule = (props: Props) => {
  const startTime = new Date(2014, 1, 10, 1, 0);
  const endTime = addMinutes(startTime, 40);

  // console.log(endTime);
  const trueOrFalse = areIntervalsOverlapping(
    { start: startTime, end: endTime },
    { start: startTime, end: endTime }
  );

  const [amPm, setAmPm] = React.useState("");
  const [isAmClicked, setIsAmClicked] = React.useState(false);
  const [isPmClicked, setIsPmClicked] = React.useState(false);

  const [hour, setHour] = React.useState("");
  const [min, setMin] = React.useState("");
  const changeHour = (value: string) => {
    setHour(value);
  };
  const changeMin = (value: string) => {
    setMin(value);
  };
  console.log("hour", hour);
  console.log("min", min);
  const handleAmClick = () => {
    setAmPm("AM");
    setIsAmClicked(!isAmClicked);
    setIsPmClicked(false);
    console.log("am", amPm);
  };
  const handlePmClick = () => {
    setAmPm("PM");
    setIsPmClicked(!isPmClicked);
    setIsAmClicked(false);
    console.log("pm", amPm);
  };

  const week = useRecoilValue<Date[]>(weekState);

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

        <div style={{ display: "flex" }}>
          <RepeatOnText>Repeat on</RepeatOnText>
          {week.map((day: Date, index: number) => {
            return (
              <DayButton
                key={index}
                date={day.toLocaleDateString()}
                onClick={() => {
                  console.log(day.toLocaleDateString());
                  // onClick시 버튼안에 있는 date를 post 할 데이터에 추가하는 로직 여기에
                }}
              >
                {WEEK_ARRAY[day.getDay()]}
              </DayButton>
            );
          })}
        </div>
      </WhiteContainer>
      <ButtonContainer>
        <Link to="/">
          <Button>Save</Button>
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
