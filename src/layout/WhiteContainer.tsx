import styled from "styled-components";

export const WhiteContainer = styled.div`
  width: 95%; //1298px랑 거의 같음
  height: 340px; //이게 맞나?
  background: #ffffff;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25); /* view 같은 그림자 있으면 좋을 듯 */
  /* left: calc(50% - 195.71px/2 - 586.14px);
top: calc(50% - 340px/2 - 95px); 피그마에서는 마진 대신 position absolute으로 했음 */
`;