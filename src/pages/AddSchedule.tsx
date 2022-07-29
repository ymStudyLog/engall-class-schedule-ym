import styled from 'styled-components';
import Button from '../components/Button';
//import { WeekdayContainer } from "../components/youmee/WeekdayContainer";
import { WhiteContainer } from '../components/youmee/WhiteContainer';
import { areIntervalsOverlapping, addMinutes } from 'date-fns';

type Props = {};

const AddSchedule = (props: Props) => {
  const startTime = new Date(2014, 1, 10, 1, 0);
  const endTime = addMinutes(startTime, 40);
  console.log(endTime);
  const trueOrFalse = areIntervalsOverlapping({ start: startTime, end: endTime }, { start: startTime, end: endTime });
  console.log(trueOrFalse);

  return (
    <WeeklyContainer>
      <TitleContainer>
        <Title>Add class schedule</Title>
      </TitleContainer>
      <WhiteContainer>
        <button>월요일</button>
        <button>화요일</button>
        <button>수요일</button>
        <button>목요일</button>
        <button>금요일</button>
        <button>토요일</button>
        <button>일요일</button>
      </WhiteContainer>
      <ButtonContainer>
        <Button>Save</Button>
      </ButtonContainer>
    </WeeklyContainer>
  );
};

export default AddSchedule;

const WeeklyContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  width: 95%;
  padding: 30px 0;
  display: flex;
  justify-content: flex-start;
`;

const ButtonContainer = styled.div`
  width: 95%;
  padding: 30px 0;
  display: flex;
  justify-content: flex-end;
`;

const Title = styled.h1`
  font-family: var(--fontFamily--bold);
  font-size: var(--fontSize-root--large);
  display: flex;
  align-items: center;
`;

const TestDropdown = styled.div`
  width: 75px;
  height: 50px;
  font-size: 20px;
  background-color: black;
  color: white;
`;
