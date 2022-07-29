import styled from "styled-components"

export const UlWrapper = styled.div`
  height: 152px;
  display: inline-block;
  overflow: scroll;
`;

export const DropDownContainer = styled.ul`
  display: inline-flex;
  flex-direction: column;
  list-style: none;
  overflow-y: scroll;
  margin: 0 auto;
`;

export const StyledLi = styled.li<{ isOpen: boolean }>`
  width: 75px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.isOpen ? "rgba(180, 180, 180, 0.3)" : "#fff"};
  font-size: 20px;
  color: var(--color-black);
  margin: 0 auto;
  border: 1px solid var(--color-border);
`;

export const ListItem = styled.li`
  width: 75px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid var(--color-border);
`;
