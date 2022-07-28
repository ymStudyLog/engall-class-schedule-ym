import React from 'react';
import styled from 'styled-components';

type Props = {};

const Component1Modal = (props: Props) => {
  return (
    <DeleteConfirmModal>
      <ConfirmText>Are you sure?</ConfirmText>
    </DeleteConfirmModal>
  );
};

export default Component1Modal;

const DeleteConfirmModal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 4px;
  gap: 7px;
  width: 150px;
  height: 60px;
  left: 20px;
  top: 18px;
  background-color: #efefef;
  border-radius: 8px;
`;

const ConfirmText = styled.div`
  width: 100%;
  height: 44.62px;
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
