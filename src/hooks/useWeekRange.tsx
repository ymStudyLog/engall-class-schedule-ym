import React from "react";
import { getDay, toDate, addDays } from "date-fns";

type Props = {
  today: Date;
};

//TODO 사용안하면 버리기
//현재 날짜(today)를 props로 받으면 월~일 생성
const useWeekRange = (props: Props) => {
  const { today } = props;
  const [monday, setMonday] = React.useState<Date>(new Date());
  
  React.useEffect(() => {
    const day: number = getDay(today);
    const mondayMilliseconds: number = today.setDate(
      day === 0 ? today.getDate() - 6 : today.getDate() - (day - 1)
      );
    setMonday(toDate(mondayMilliseconds));
  }, [today]);

  return([
    monday,
    addDays(monday, 1),
    addDays(monday, 2),
    addDays(monday, 3),
    addDays(monday, 4),
    addDays(monday, 5),
    addDays(monday, 6),
  ])
};

export default useWeekRange;
