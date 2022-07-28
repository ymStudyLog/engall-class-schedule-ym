import styled from 'styled-components';
import Button from "../components/Button";
import { WhiteContainer } from "../layout/WhiteContainer";
import { PageContainer, PageTitle, ElementContainer } from "../styles/page.style";

type Props = {};

const AddSchedule = (props: Props) => {
  return(
    <PageContainer>
    <TitleContainer>
      <PageTitle>Add class schedule</PageTitle>
    </TitleContainer>
    <WhiteContainer>
      
    </WhiteContainer>
    <ButtonContainer>
      <Button>Save</Button>
    </ButtonContainer>
  </PageContainer>
    )
};

export default AddSchedule;

const TitleContainer = styled(ElementContainer)`
  justify-content: flex-start;
`;

const ButtonContainer = styled(ElementContainer)`
  justify-content: flex-end;
`;

