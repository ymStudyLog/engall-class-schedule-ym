import styled from 'styled-components';
import Button from "../components/Button";
import { WeekdayContainer } from "../components/youmee/WeekdayContainer";
import { WhiteContainer } from "../components/youmee/WhiteContainer";

type Props = {};

const AddSchedule = (props: Props) => {
  return(
    <WeeklyContainer>
    <TitleContainer>
      <Title>Add class schedule</Title>
    </TitleContainer>
    <WhiteContainer>
      
    </WhiteContainer>
    <ButtonContainer>
      <Button>Save</Button>
    </ButtonContainer>
  </WeeklyContainer>
    )
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