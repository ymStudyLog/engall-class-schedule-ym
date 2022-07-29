import React from "react";
import styled from "styled-components";
import { deleteSchedule } from "../api/api";

type Props = {
  id: number;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConfirmDeleteModal = (props: Props) => {
  const { id, setIsModalOpen } = props;
  const handleDeleteClick = () => {
    deleteSchedule(id);
    setIsModalOpen(false);
  };
  const handleCancelClick = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContainer>
      <ConfirmDeleteText>Sure to delete?</ConfirmDeleteText>
      <ButtonContainer>
        <ModalButton onClick={handleDeleteClick}>Delete</ModalButton>
        <ModalButton onClick={handleCancelClick}>Cancel</ModalButton>
      </ButtonContainer>
    </ModalContainer>
  );
};

export default ConfirmDeleteModal;

const ModalContainer = styled.div`
  width: 160px;
  height: 75px;
  padding: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
  background-color: #efefef;
  border-radius: 8px;
  z-index: 100;
`;

const ConfirmDeleteText = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-middle-gray);
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

// 반복되는 버튼 컴포넌트 추후에 수정 예정
const ModalButton = styled.button`
  width: 50%;
  color: var(--color-middle-gray);

  &:hover {
    background-color: var(--color-blue);
    color: var(--color-white);
  }
`;
