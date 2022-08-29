import React from "react";
import { getSchedule } from "../api/api";
import { ScheduleType } from "../types/ScheduleType";

type Props = {
  week: Date[];
};

//이모델은 week(월~일)을 인자로 받으면 weekSchedule을 return함
//TODO useEffect 안에 넣으면 db변경시 자동 업데이트가 안됨
const useWeekSchedule = (props: Props) => {
  const { week } = props;
  const [weekSchedule, setWeekSchedule] = React.useState<ScheduleType[]>([]);
  
  // const [query,setQuery] = React.useState<string>("");
  // React.useEffect(()=>{
  //   const queryByWeek = `?date_gte=${week[0].toLocaleDateString()}&date_lte=${week[
  //     week.length - 1
  //   ].toLocaleDateString()}`;
  //   setQuery(queryByWeek);
  // },[week]);

  // React.useEffect(()=>{
  //   getSchedule<ScheduleType[]>(query).then((data) => setWeekSchedule(data));
  // },[query]);

  const query = `?date_gte=${week[0].toLocaleDateString()}&date_lte=${week[
    week.length - 1
  ].toLocaleDateString()}`;

  getSchedule<ScheduleType[]>(query).then((data) => setWeekSchedule(data));

  return {
    weekSchedule,
  };
};

export default useWeekSchedule;
