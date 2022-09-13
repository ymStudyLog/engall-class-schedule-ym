import React from "react";
import styled from "styled-components";
import { AiFillCaretDown } from "react-icons/ai";
import { DROPDOWN_OPTIONS } from "../../lib/dropdownOptions";
import { TimeType } from "../../types/TimeType";
import useAmPm from "../../hooks/useAmPm";

type Props = {
  setSelectedTime: React.Dispatch<React.SetStateAction<TimeType<string>>>;
  selectedTime: TimeType<string>;
};

//TODO 리팩토링?
const StartTime = (props: Props) => {
  const { setSelectedTime, selectedTime } = props;
  const [isOpen, setIsOpen] = React.useState<TimeType<boolean>>({
    hour: false,
    minute: false,
  });
  const { isClicked, handleAmClick, handlePmClick, createTwoDigit } = useAmPm({
    setSelectedTime,
  });

  return (
    <>
      <MarginBox>
        <DropDownList>
          <DropDownListHeader
            isOpen={isOpen.hour}
            onClick={() => {
              setIsOpen({
                ...isOpen,
                hour: !isOpen.hour,
              });
            }}
          >
            {selectedTime.hour.length === 0
              ? "00"
              : parseInt(selectedTime.hour) >= 12
              ? createTwoDigit(parseInt(selectedTime.hour) - 12)
              : selectedTime.hour}
            {isOpen.hour ? <AiFillCaretDown /> : ""}
          </DropDownListHeader>
          <DropDownListItemContainer>
            {isOpen.hour &&
              DROPDOWN_OPTIONS.hour.map((optionItem: string, index: number) => {
                return (
                  <DropDownListItem
                    onClick={() => {
                      setSelectedTime({ ...selectedTime, hour: optionItem });
                      setIsOpen({
                        ...isOpen,
                        hour: !isOpen.hour,
                      });
                    }}
                    key={index}
                  >
                    {optionItem}
                  </DropDownListItem>
                );
              })}
          </DropDownListItemContainer>
        </DropDownList>
        <MarginBox>:</MarginBox>
        <DropDownList>
          <DropDownListHeader
            isOpen={isOpen.minute}
            onClick={() => {
              setIsOpen({
                ...isOpen,
                minute: !isOpen.minute,
              });
            }}
          >
            {selectedTime.minute.length === 0 ? "00" : selectedTime.minute}
            {isOpen.minute ? <AiFillCaretDown /> : ""}
          </DropDownListHeader>
          <DropDownListItemContainer>
            {isOpen.minute &&
              DROPDOWN_OPTIONS.minute.map((optionItem, index) => {
                return (
                  <DropDownListItem
                    onClick={() => {
                      setSelectedTime({ ...selectedTime, minute: optionItem });
                      setIsOpen({
                        ...isOpen,
                        minute: !isOpen.minute,
                      });
                    }}
                    key={index}
                  >
                    {optionItem}
                  </DropDownListItem>
                );
              })}
          </DropDownListItemContainer>
        </DropDownList>
      </MarginBox>
      <MarginBox>
        <AmPmButton
          onClick={() => handleAmClick(selectedTime)}
          isClicked={isClicked.am}
        >
          AM
        </AmPmButton>
        <MarginBox />
        <AmPmButton
          onClick={() => handlePmClick(selectedTime)}
          isClicked={isClicked.pm}
        >
          PM
        </AmPmButton>
      </MarginBox>
    </>
  );
};

export default StartTime;

const DropDownList = styled.ul`
  width: 75px;
  display: flex;
  flex-direction: column;
  list-style: none;
`;

const DropDownListItem = styled.li`
  width: 75px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin: 0;
  padding: 0;
  border: 1px solid var(--color-border);
  cursor: default;
`;

const DropDownListItemContainer = styled.div`
  position: absolute;
  top: 120px;
  height: 100px;
  overflow-y: scroll;
`;

const DropDownListHeader = styled(DropDownListItem)<{ isOpen: boolean }>`
  position: relative;
  cursor: pointer;
  background-color: ${(props) =>
    props.isOpen ? "rgba(180, 180, 180, 0.3)" : "#fff"};
`;

const AmPmButton = styled.button<{ isClicked: boolean }>`
  width: 75px;
  height: 50px;
  font-size: 20px;
  background-color: ${(props) =>
    props.isClicked ? `var(--color-gray)` : "var(--color-white)"};
  color: ${(props) =>
    props.isClicked ? "var(--color-white)" : `var(--color-gray)`};
  border: 1px solid var(--color-border);
`;

const MarginBox = styled.div`
  margin: 0 6px;
  display: flex;
  align-items: center;
`;
