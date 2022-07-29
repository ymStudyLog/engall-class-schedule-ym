import styled from "styled-components";

type Props = {
  time: string;
  key: number;
  id: number;
};

//time은 startTime과 endTime, am,pm 들을 단순히 이은 string
const ScheduleBox = (props: Props) => {
  const { time, id } = props;
  //id는 delete할때 필요
  
  return (
    <ScheduleBoxContainer>
      <ScheduleText>{time}</ScheduleText>
      <CancelButton src="./images/cancel.png" />
    </ScheduleBoxContainer>
  );
};

export default ScheduleBox;

const ScheduleBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 4px;
  gap: 7px;
  width: 133px;
  height: 53px;
  left: 20px;
  top: 18px;
  background-color: #efefef;
  border-radius: 8px;
`;

const ScheduleText = styled.div`
  width: 100px;
  height: 44.62px;
  display: flex;
  align-items: center;
  color: #747474;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const CancelButton = styled.img`
  width: 24px;
  height: 24px;
  flex: none;
  order: 1;
  flex-grow: 0;
  cursor: pointer;
`;
