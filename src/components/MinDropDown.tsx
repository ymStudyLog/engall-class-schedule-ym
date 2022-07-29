import React from "react";
import styled from "styled-components";
import { AiFillCaretDown } from "react-icons/ai";
import * as DropDownStyled from "../styles/DropDown.styled";
import { DropDownHeaderType } from "../types/DropDownHeaderType";
type Props = {
  changeMin: (value: string) => void;
  min: string;
};

const MinDropDown = (props: Props) => {
  const { changeMin, min } = props;

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const toggling = () => setIsOpen(!isOpen);
  const onOptionClicked = (value: any) => () => {
    changeMin(value);
    setIsOpen(false);
  };
  const options = [
    "00",
    "05",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
    "55",
  ];

  return (
    <DropDownStyled.UlWrapper>
      <DropDownStyled.DropDownContainer>
        <DropDownHeader isOpen={isOpen} onClick={toggling}>
          {min || "00"}
          {isOpen ? <AiFillCaretDown /> : ""}
        </DropDownHeader>
        {isOpen &&
          options.map((option, index) => {
            if (min === "00" && option === "00") return null;
            else
              return (
                <DropDownStyled.ListItem
                  onClick={onOptionClicked(option)}
                  key={`${index}`}
                >
                  {option}
                </DropDownStyled.ListItem>
              );
          })}
      </DropDownStyled.DropDownContainer>
    </DropDownStyled.UlWrapper>
  );
};

export default MinDropDown;


const DropDownHeader = (props: DropDownHeaderType) => (
  <DropDownStyled.StyledLi {...props}>{props.children}</DropDownStyled.StyledLi>
);
