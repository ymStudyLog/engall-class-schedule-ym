import React from "react";
import styled from "styled-components";
import { Background } from "./youmee/Background";

type Props = {};

const MinDropDown = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  //리코일 변경 예정
  const [selectedMinute, setMinute] = React.useState<string>("00");

  const toggling = () => setIsOpen(!isOpen);
  const onOptionClicked = (value: any) => () => {
    setMinute(value);
    setIsOpen(false);
  };
  console.log(selectedMinute);
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
        <DropDownHeader onClick={toggling}>
          {selectedMinute || "00"}
        </DropDownHeader>
        {isOpen &&
          options.map((option, index) => {
            if (selectedMinute === "00" && option === "00") return null;
            else
              return (
                <ListItem
                  onClick={onOptionClicked(option)}
                  key={`${index}`}
                  selected={option === selectedMinute}
                >
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

const DropDownHeader = styled.li`
  /* box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15); */
  width: 75px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #ffffff;
  font-size: 20px;
  color: #000;

  margin: 0 auto;
  border: 1px solid #b4b4b4;
`;

const ListItem = styled.li<{ selected: boolean }>`
  width: 75px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 20px;
  list-style: none;

  background-color: ${(props) =>
    props.selected ? "rgba(180, 180, 180, 0.3)" : "white"};

  padding: 0;
  margin: 0;
  border: 1px solid #b4b4b4;
`;
