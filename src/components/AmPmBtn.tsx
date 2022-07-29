import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
};

const AmPmBtn = (props: Props) => {
  const [click, setClick] = React.useState(false);
  const handleBtnClick = () => {
    setClick(!click);
  };

  return <AmPmTime onClick={handleBtnClick} isClicked={click}></AmPmTime>;
};

export default AmPmBtn;

const AmPmTime = styled.button<{ isClicked: boolean }>`
  width: 75px;
  height: 50px;
  font-size: 20px;
  background-color: #fff;
  color: #000;
`;
