import React from "react";
import { useSetRecoilState } from "recoil";
import { getSchedule } from "../api/api";
import { weeklySchedule } from "../store/atom";
import { ScheduleType } from "../types/scheduleType";

type Props = {
  week: Date[];
};

const useWeekSchedule = (props: Props) => {
  const { week } = props;
  const setSchedule = useSetRecoilState<ScheduleType[]>(weeklySchedule);
  const [weekSchedule, setWeekSchedule] = React.useState<ScheduleType[]>([]);
  const query = `?date_gte=${week[0].toLocaleDateString()}&date_lte=${week[
    week.length - 1
  ].toLocaleDateString()}`;

  // React.useEffect(() => {
  //   getSchedule<ScheduleType[]>(query).then((data) => setWeekSchedule(data));
  // }, [query]);

  const getWeeklySchedule = () => {
    getSchedule<ScheduleType[]>(query).then((data) => {
      setWeekSchedule(data);
      setSchedule(data);
    });
  };

  return {
    weekSchedule,
    getWeeklySchedule,
  };
};

export default useWeekSchedule;
