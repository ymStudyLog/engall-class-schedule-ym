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
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const handleDelete = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <ScheduleBoxContainer>
      <ScheduleText>{time}</ScheduleText>
      <DeleteButton src="./images/cancel.png" onClick={handleDelete} />
      {isModalOpen && <ConfirmDeleteModal id={id} setIsModalOpen={setIsModalOpen} /> }
    </ScheduleBoxContainer>
  );
};

export default ScheduleBox;

const ScheduleBoxContainer = styled.div`
  display: flex;
  padding: 4px;
  width: 140px;
  height: 65px;
  background-color: var(--color-light-gray);
  border-radius: 8px;
  position: relative;
`;

const ScheduleText = styled.div`
  width: 130px;
  height: 50px;
  padding: 2px;
  display: flex;
  align-items: center;
  color: var(--color-dark-gray);
`;

const DeleteButton = styled.img`
  width: 24px;
  height: 24px;
  flex: none;
  order: 1;
  flex-grow: 0;
  cursor: pointer;
`;
