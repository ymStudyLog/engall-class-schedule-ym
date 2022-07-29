import styled from 'styled-components';
import Button from '../components/Button';
import { WhiteContainer } from '../layout/WhiteContainer';
import { PageContainer, PageTitle, ElementContainer } from '../styles/page.style';
import { areIntervalsOverlapping, addMinutes } from 'date-fns';

type Props = {};

const AddSchedule = (props: Props) => {
  const startTime = new Date(2014, 1, 10, 1, 0);
  const endTime = addMinutes(startTime, 40);
  console.log(endTime);
  const trueOrFalse = areIntervalsOverlapping({ start: startTime, end: endTime }, { start: startTime, end: endTime });
  console.log(trueOrFalse);

  return (
    <PageContainer>
      <TitleContainer>
        <PageTitle>Add class schedule</PageTitle>
      </TitleContainer>
      <WhiteContainer></WhiteContainer>
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
