import React from 'react';
import styled from 'styled-components';
import { AiFillCaretDown } from 'react-icons/ai';

type Props = {
  changeHour: (value: string) => void;
  hour: string;
};

const HourDropDown = (props: Props) => {
  const { changeHour, hour } = props;
  const [selectedHour, setSelectedHour] = React.useState<number>(-1);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const toggling = () => setIsOpen(!isOpen);
  const onOptionClicked = (value: any, index:number) => () => {
    setSelectedHour(index);
    changeHour(value);
    setIsOpen(false);
  };
  const options = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];

  return (
    <UlWrapper>
      <DropDownContainer>
        <DropDownHeader isOpen={isOpen} onClick={toggling}>
          {options[selectedHour] || '00'}
          {isOpen ? <AiFillCaretDown /> : ''}
        </DropDownHeader>
        {isOpen &&
          options.map((option, index) => {
            if (hour === `00` && option === '00') return null;
            else
              return (
                <ListItem onClick={onOptionClicked(option,index)} key={index}>
                  {option}
                </ListItem>
              );
          })}
      </DropDownContainer>
    </UlWrapper>
  );
};

export default HourDropDown;

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

  background-color: ${(props) => (props.isOpen ? 'rgba(180, 180, 180, 0.3)' : '#fff')};

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

const DropDownHeader = (props: DropDownHeaderType) => <StyledLi {...props}>{props.children}</StyledLi>;

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
