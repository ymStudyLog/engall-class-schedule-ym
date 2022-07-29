import React from "react";
import styled from "styled-components";

type Props = {};

const ConfirmDeleteModal = (props: Props) => {
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const handleDeleteClick = () => {
    console.log("delete click");
  };
  const handleCancelClick = () => {
    console.log("setClose 연결");
  };

  return (
    <ModalContainer>
      <ConfirmDeleteText>Sure to delete?</ConfirmDeleteText>
      <ButtonContainer>
        <DeleteButton onClick={handleDeleteClick}>Delete</DeleteButton>
        <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
      </ButtonContainer>
    </ModalContainer>
  );
};

export default ConfirmDeleteModal;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-around;
  padding: 4px;
  gap: 7px;
  width: 133px;
  height: 53px;
  left: 20px;
  top: 18px;
  background-color: #efefef;
  border-radius: 8px;
`;

const ConfirmDeleteText = styled.div`
  width: 100%;
  height: 20px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  display: flex;
  align-items: center;
  color: #747474;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;

// 반복되는 버튼 컴포넌트 추후에 수정 예정
const DeleteButton = styled.button`
  width: 50%;
  height: 10%;
  color: #747474;
`;

const CancelButton = styled.button`
  width: 50%;
  height: 10%;
  color: #747474;
`;
