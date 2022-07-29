import React from "react";
import { deleteSchedule } from "../api/api";
import * as Confirm from "../styles/Confirm.styled";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { weekState, scheduleState } from "../store/weekAtom";
import { scheduleService } from "../api/api";
import { ScheduleType } from "../types/ScheduleType";

type Props = {
  id: number;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConfirmDeleteModal = (props: Props) => {
  const { id, setIsModalOpen } = props;
  const week = useRecoilValue<Date[]>(weekState);
  const setSchedule = useSetRecoilState<ScheduleType[]>(scheduleState);

  const requestUrlString = `?date_gte=${week[0].toLocaleDateString()}&date_lte=${week[
    week.length - 1
  ].toLocaleDateString()}`;

  const handleDeleteClick = () => {
    deleteSchedule(id).then(() => {
      scheduleService.get(requestUrlString).then((response) => {
        setSchedule(response.data); //TODO hooks
      });
    });
    setIsModalOpen(false);
  };
  const handleCancelClick = () => {
    setIsModalOpen(false);
  };

  return (
    <Confirm.ModalContainer>
      <Confirm.ConfirmDeleteText>Sure to delete?</Confirm.ConfirmDeleteText>
      <Confirm.ButtonContainer>
        <Confirm.ModalButton onClick={handleDeleteClick}>
          Delete
        </Confirm.ModalButton>
        <Confirm.ModalButton onClick={handleCancelClick}>
          Cancel
        </Confirm.ModalButton>
      </Confirm.ButtonContainer>
    </Confirm.ModalContainer>
  );
};

export default ConfirmDeleteModal;
