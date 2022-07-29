import styled from "styled-components"

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
`;

export const ConfirmDeleteText = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-middle-gray);
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

export const ModalButton = styled.button`
  width: 50%;
  color: var(--color-middle-gray);

  &:hover {
    background-color: var(--color-blue);
    color: var(--color-white);
  }
`;
