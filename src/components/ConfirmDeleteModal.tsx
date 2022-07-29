import React from "react";
import styled from "styled-components";
import { deleteSchedule } from "../api/api";
import * as Confirm from "../styles/Confirm.styled"
import { useRecoilState, useRecoilValue } from "recoil";
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
  const [schedule, setSchedule] = useRecoilState<ScheduleType[]>(scheduleState);

  const requestUrlString = `?date_gte=${week[0].toLocaleDateString()}&date_lte=${week[
    week.length - 1
  ].toLocaleDateString()}`;

  const handleDeleteClick = () => {
    deleteSchedule(id).then(() => {
      scheduleService.get(requestUrlString).then((response) => {
        setSchedule(response.data);
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
        <Confirm.ModalButton onClick={handleDeleteClick}>Delete</Confirm.ModalButton>
        <Confirm.ModalButton onClick={handleCancelClick}>Cancel</Confirm.ModalButton>
      </Confirm.ButtonContainer>
    </Confirm.ModalContainer>
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
  position: absolute;
  top: -65px;
  left: 120px;
  border: 1px solid #d4d4d4;
`;

const ConfirmDeleteText = styled.div`
  width: 150px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #747474;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 150px;
  justify-content: space-around;
`;

const ModalButton = styled.button`
  width: 75px;
  color: #747474;
  border: 1px solid #d4d4d4;

  &:hover {
    background-color: #3175d8;
  }
`;
