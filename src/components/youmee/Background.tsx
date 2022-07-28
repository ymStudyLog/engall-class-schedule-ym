import styled from "styled-components";

type Props = {
    children : React.ReactNode;
};

export const Background = (props: Props) => <BackgroundDiv {...props}>{props.children}</BackgroundDiv>

const BackgroundDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f4f4f4;
`;