import React from "react";
import styled from "styled-components";
import { AiFillCaretDown } from "react-icons/ai";

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
    <UlWrapper>
      <DropDownContainer>
        <DropDownHeader isOpen={isOpen} onClick={toggling}>
          {min || "00"}
          {isOpen ? <AiFillCaretDown /> : ""}
        </DropDownHeader>
        {isOpen &&
          options.map((option, index) => {
            if (min === "00" && option === "00") return null;
            else
              return (
                <ListItem onClick={onOptionClicked(option)} key={`${index}`}>
                  {option}
                </ListItem>
              );
          })}
      </DropDownContainer>
    </UlWrapper>
  );
};

export default MinDropDown;

const UlWrapper = styled.div`
  height: 152px;

  display: inline-block;

  overflow: scroll;
`;

const DropDownContainer = styled.ul`
  display: inline-flex;
  flex-direction: column;

  list-style: none;
  overflow-y: scroll;

  margin: 0 auto;
`;
const StyledLi = styled.li<{ isOpen: boolean }>`
  /* box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15); */
  width: 75px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) =>
    props.isOpen ? "rgba(180, 180, 180, 0.3)" : "#fff"};

  font-size: 20px;
  color: #000;

  margin: 0 auto;
  border: 1px solid #b4b4b4;
`;

type DropDownHeaderType = {
  isOpen: boolean;
  children: React.ReactNode;
  onClick: () => void;
};

const DropDownHeader = (props: DropDownHeaderType) => (
  <StyledLi {...props}>{props.children}</StyledLi>
);

const ListItem = styled.li`
  width: 75px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 20px;
  list-style: none;

  padding: 0;
  margin: 0;
  border: 1px solid #b4b4b4;
`;
