import styled from "styled-components";

export const ModalContainer = styled.div`
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

export const ConfirmDeleteText = styled.div`
  width: 150px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #747474;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 150px;
  justify-content: space-around;
`;

export const ModalButton = styled.button`
  width: 75px;
  color: #747474;
  border: 1px solid #d4d4d4;

  &:hover {
    background-color: var(--color-blue);
    color: var(--color-white);
  }
`;
