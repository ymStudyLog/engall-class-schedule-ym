import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const Button = (props: Props) => <BlueBtn {...props}>{props.children}</BlueBtn>;

export default Button;

const BlueBtn = styled.button`
  width: 220px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #3175d8;
  color: #fff;
  font-size: 20px;
  :active {
    transform: scale(1.03);
  }
`;
