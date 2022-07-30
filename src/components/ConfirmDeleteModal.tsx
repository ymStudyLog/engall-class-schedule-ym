import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { deleteSchedule, scheduleService } from "../api/api";
import { getUrlString, scheduleState } from "../store/atom";
import { ScheduleType } from "../types/ScheduleType";
import * as ConfirmModal from "../styles/ConfirmModal.styled";

type Props = {
  id: number;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConfirmDeleteModal = (props: Props) => {
  const { id, setIsModalOpen } = props;
  const url = useRecoilValue<string>(getUrlString);
  const setSchedule = useSetRecoilState<ScheduleType[]>(scheduleState);

  const handleDeleteClick = () => {
    deleteSchedule(id).then(() => {
      scheduleService.get(url).then((response) => {
        setSchedule(response.data);
      });
    });
    setIsModalOpen(false);
  };
  
  const handleCancelClick = () => {
    setIsModalOpen(false);
  };

  return (
    <ConfirmModal.ModalContainer>
      <ConfirmModal.ConfirmDeleteText>
        Sure to delete?
      </ConfirmModal.ConfirmDeleteText>
      <ConfirmModal.ButtonContainer>
        <ConfirmModal.ModalButton onClick={handleDeleteClick}>
          Delete
        </ConfirmModal.ModalButton>
        <ConfirmModal.ModalButton onClick={handleCancelClick}>
          Cancel
        </ConfirmModal.ModalButton>
      </ConfirmModal.ButtonContainer>
    </ConfirmModal.ModalContainer>
  );
};

export default ConfirmDeleteModal;
