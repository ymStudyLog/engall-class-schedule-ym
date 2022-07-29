import styled from "styled-components";
import Button from "../components/Button";
import { WhiteContainer } from "../layout/WhiteContainer";
import {
  PageContainer,
  PageTitle,
  ElementContainer,
} from "../styles/page.style";
import { areIntervalsOverlapping, addMinutes } from "date-fns";
import HourDropDown from "../components/HourDropDown";
import MinDropDown from "../components/MinDropDown";
import AmPmButton from "../components/AmPmButton";

type Props = {};

const AddSchedule = (props: Props) => {
  const startTime = new Date(2014, 1, 10, 1, 0);
  const endTime = addMinutes(startTime, 40);
  console.log(endTime);
  const trueOrFalse = areIntervalsOverlapping(
    { start: startTime, end: endTime },
    { start: startTime, end: endTime }
  );
  console.log(trueOrFalse);
  const handleAmClick = () => {
    console.log("AM");
  };
  const handlePmClick = () => {
    console.log("PM");
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
            <HourDropDown />
            {/* <ColoneText>:</ColoneText> */}
            <MinDropDown />

            <AmPmButton handleClick={handleAmClick}>AM</AmPmButton>
            <AmPmButton handleClick={handlePmClick}>PM</AmPmButton>
          </DropDownContainer>
        </StartTimeContainer>
        <RepeatContainer>
          <p>Repeat on</p>
        </RepeatContainer>
      </WhiteContainer>
      <ButtonContainer>
        <Button>Save</Button>
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
  height: 200px;
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
