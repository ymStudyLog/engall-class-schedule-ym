import styled from 'styled-components'
import { ElementContainer } from './page.style';

export const TitleContainer = styled(ElementContainer)`
  justify-content: flex-start;
`;

export const ButtonContainer = styled(ElementContainer)`
  justify-content: flex-end;
`;

export const Positioner = styled.div`
  width: 100%;
  height: 100px;
  margin-left: 36px;
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 50px;
  align-items: center;
`;

export const StartTimeContainer = styled.div`
  width: 100%;
  height: 100px;
  margin-left: 36px;
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 10px;
`;

export const DropDownContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  justify-content: space-around;
  width: 350px;
  margin-top: 40px;
`;

export const StartTimeText = styled.div`
  display: flex;
  align-items: center;
  margin-right: 25px;
  margin-top: 30px;
  padding-left: 5px;
  box-sizing: border-box;
`;

export const ColoneText = styled.div`
  position: absolute;
  bottom: 17px;
  left: 77px;
`;

export const RepeatOnText = styled.div`
  display: flex;
  align-items: center;
  margin-right: 25px;
  padding-left: 5px;
`;

export const HourMinContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 160px;
  position: relative;
`;
