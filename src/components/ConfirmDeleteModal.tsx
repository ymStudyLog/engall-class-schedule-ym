import React from "react";
import styled from "styled-components";
import { deleteSchedule } from "../api/api";
import * as Confirm from "../styles/Confirm.styled"
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
    <Confirm.ModalContainer>
      <Confirm.ConfirmDeleteText>Sure to delete?</Confirm.ConfirmDeleteText>
      <Confirm.ButtonContainer>
        <Confirm.ModalButton onClick={handleDeleteClick}>Delete</Confirm.ModalButton>
        <Confirm.ModalButton onClick={handleCancelClick}>Cancel</Confirm.ModalButton>
      </Confirm.ButtonContainer>
    </Confirm.ModalContainer>
  );
};

export default ConfirmDeleteModal;

