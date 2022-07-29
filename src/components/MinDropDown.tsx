import React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { DropDownHeaderType } from "../types/DropDownHeaderType";
import { minuteOptions } from "../utils/dropdownOptions";
import * as DropDownStyled from "../styles/DropDown.styled";

type Props = {
  setMinute: React.Dispatch<React.SetStateAction<string>>;
  minute: string;
};

const MinDropDown = (props: Props) => {
  const { setMinute, minute } = props;
  const [selectedMinute, setSelectedMinute] = React.useState<number>(-1);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const onToggle = () => setIsOpen(!isOpen);
  const onOptionClicked = (value: any, index: number) => () => {
    setSelectedMinute(index);
    setMinute(value);
    setIsOpen(false);
  };

  return (
    <DropDownStyled.UlWrapper>
      <DropDownStyled.DropDownContainer>
        <DropDownHeader isOpen={isOpen} onClick={onToggle}>
          {minuteOptions[selectedMinute] || "00"}
          {isOpen ? <AiFillCaretDown /> : ""}
        </DropDownHeader>
        {isOpen &&
          minuteOptions.map((minuteOption, index) => {
            if (minute === "00" && minuteOption === "00") return null;
            else
              return (
                <DropDownStyled.ListItem
                  onClick={onOptionClicked(minuteOption,index)}
                  key={index}
                >
                  {minuteOption}
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
