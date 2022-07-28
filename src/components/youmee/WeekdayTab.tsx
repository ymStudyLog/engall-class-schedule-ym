import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const WeekdayTabDiv = styled.div`
  width: 160px;
  height: 50px;
  background: #ffffff;
  border: 1px solid #b4b4b4;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  font-family: "Karla", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #000000;
`;

export const WeekdayTab = (props: Props) => <WeekdayTabDiv {...props}><Text>{props.children}</Text></WeekdayTabDiv>;