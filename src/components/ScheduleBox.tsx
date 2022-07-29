import React from "react";
import styled from "styled-components";
import { deleteSchedule } from "../api/api";

type Props = {
  time: string;
  key: number;
  id: number;
};

const ScheduleBox = (props: Props) => {
  const testDelete = () => {
    deleteSchedule(100).then(() => console.log("delete 성공"));
  };

  const { time, id } = props;
  console.log(time, id);
  return (
    <ScheduleBoxContainer>
      <ScheduleText>{time}</ScheduleText>
      <CancelButton
        src="./images/cancel.png"
        // onClick={testDelete()}
      />
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
