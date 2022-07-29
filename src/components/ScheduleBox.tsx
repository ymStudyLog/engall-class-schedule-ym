import React from "react";
import styled from "styled-components";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

type Props = {
  time: string;
  key: number;
  id: number;
};

const ScheduleBox = (props: Props) => {
  const { time, id } = props;
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleDelete = () => {
    setIsModalOpen(true);
  };

  return (
    <ScheduleBoxContainer>
      <ScheduleText>{time}</ScheduleText>
      {isModalOpen ? (
        <ConfirmDeleteModal id={id} setIsModalOpen={setIsModalOpen} />
      ) : (
        <DeleteButton src="./images/cancel.png" onClick={handleDelete} />
      )}
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

const DeleteButton = styled.img`
  width: 24px;
  height: 24px;
  flex: none;
  order: 1;
  flex-grow: 0;
  cursor: pointer;
`;
