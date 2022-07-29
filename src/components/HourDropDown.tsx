import React from "react";
import styled from "styled-components";
import { AiFillCaretDown } from "react-icons/ai";
import * as DropDownStyled from "../styles/DropDown.styled"
import { DropDownHeaderType } from "../types/DropDownHeaderType";
type Props = {
  changeHour: (value: string) => void;
  hour: string;
};

const HourDropDown = (props: Props) => {
  const { changeHour, hour } = props;

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const toggling = () => setIsOpen(!isOpen);
  const onOptionClicked = (value: any) => () => {
    changeHour(value);
    setIsOpen(false);
  };
  const options = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
  ];

  return (
    <DropDownStyled.UlWrapper>
      <DropDownStyled.DropDownContainer>
        <DropDownHeader isOpen={isOpen} onClick={toggling}>
          {hour || "00"}
          {isOpen ? <AiFillCaretDown /> : ""}
        </DropDownHeader>
        {isOpen &&
          options.map((option, index) => {
            if (hour === `00` && option === "00") return null;
            else
              return (
                <DropDownStyled.ListItem onClick={onOptionClicked(option)} key={`${index}`}>
                  {option}
                </DropDownStyled.ListItem>
              );
          })}
      </DropDownStyled.DropDownContainer>
    </DropDownStyled.UlWrapper>
  );
};

export default HourDropDown;




const DropDownHeader = (props: DropDownHeaderType) => (
  <DropDownStyled.StyledLi {...props}>{props.children}</DropDownStyled.StyledLi>
);

