import React from "react";
import styled from "styled-components";
import { AiFillCaretDown } from "react-icons/ai";
import { DROPDOWN_OPTIONS } from "../../lib/dropdownOptions";
import { TimeType } from "../../types/timeType";
import useAmPm from "../../hooks/useAmPm";

type Props = {
  setTime: React.Dispatch<React.SetStateAction<TimeType<string>>>;
  time: TimeType<string>;
};

const StartTime = (props: Props) => {
  const { setTime, time } = props;
  const [isOpen, setIsOpen] = React.useState<TimeType<boolean>>({
    hour: false,
    minute: false,
  });
  const { isClicked, handleAmClick, handlePmClick, createTwoDigit } = useAmPm({setTime, time});

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
            {parseInt(time.hour) >= 12 ? createTwoDigit(parseInt(time.hour) - 12) : time.hour}
            {isOpen.hour ? <AiFillCaretDown /> : ""}
          </DropDownListHeader>
          <DropDownListItemContainer>
            {isOpen.hour &&
              DROPDOWN_OPTIONS.hour.map((optionItem: string, index: number) => {
                return (
                  <DropDownListItem
                    onClick={() => {
                      setTime({ ...time, hour: optionItem });
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
            {time.minute}
            {isOpen.minute ? <AiFillCaretDown /> : ""}
          </DropDownListHeader>
          <DropDownListItemContainer>
            {isOpen.minute &&
              DROPDOWN_OPTIONS.minute.map((optionItem, index) => {
                return (
                  <DropDownListItem
                    onClick={() => {
                      setTime({ ...time, minute: optionItem });
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
        <AmPmButton onClick={handleAmClick} isClicked={isClicked.am}>
          AM
        </AmPmButton>
        <MarginBox />
        <AmPmButton onClick={handlePmClick} isClicked={isClicked.pm}>
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
`;

const DropDownListItemContainer = styled.div`
  position: absolute;
  top: 120px;
  height: 100px;
  overflow-y: scroll;
`;

const DropDownListHeader = styled(DropDownListItem)<{ isOpen: boolean }>`
  position: relative;
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