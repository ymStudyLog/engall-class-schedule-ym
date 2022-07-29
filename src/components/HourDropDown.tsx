import React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { DropDownHeaderType } from "../types/DropDownHeaderType";
import { hourOptions } from "../utils/dropdownOptions";
import * as DropDownStyled from "../styles/DropDown.styled";

type Props = {
  setHour: React.Dispatch<React.SetStateAction<string>>;
  hour: string;
};

const HourDropDown = (props: Props) => {
  const { setHour, hour } = props;
  const [selectedHour, setSelectedHour] = React.useState<number>(-1);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const onToggle = () => setIsOpen(!isOpen);
  const onOptionClicked = (value: any, index: number) => () => {
    setSelectedHour(index);
    setHour(value);
    setIsOpen(false);
  };
 

  return (
    <DropDownStyled.UlWrapper>
      <DropDownStyled.DropDownContainer>
        <DropDownHeader isOpen={isOpen} onClick={onToggle}>
          {hourOptions[selectedHour] || "00"}
          {isOpen ? <AiFillCaretDown /> : ""}
        </DropDownHeader>
        {isOpen &&
          hourOptions.map((option, index) => {
            if (hour === `00` && option === "00") return null;
            else
              return (
                <DropDownStyled.ListItem
                  onClick={onOptionClicked(option, index)}
                  key={index}
                >
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
