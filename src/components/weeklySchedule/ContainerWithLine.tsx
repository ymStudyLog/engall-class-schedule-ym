import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const StyledDiv = styled.div`
  position: relative;
  width: 185.3px;
  min-height: 340px;
  padding-top: 20px;
  background: var(--color-white);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const HorizontalLine = styled.div`
  position: absolute;
  width: inherit;
  text-align: center;
  border-bottom: 1px solid var(--color-border);
  top: 40px;
`;

const ContainerWithLine = (props: Props) => (
  <StyledDiv>
    <HorizontalLine />
    {props.children}
  </StyledDiv>
);

export default ContainerWithLine;
