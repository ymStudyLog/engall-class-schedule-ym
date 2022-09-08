import React from "react";
import { useSetRecoilState } from "recoil";
import { format } from "date-fns";
import { getSchedule } from "../api/api";
import { idFromWeeklySchedule } from "../store/atom";
import { ScheduleType } from "../types/scheduleType";

const useWeeklySchedule = () => {
  const setIdFromWeeklySchedule =
    useSetRecoilState<number[]>(idFromWeeklySchedule);
  const [weeklySchedule, setWeeklySchedule] = React.useState<ScheduleType[]>(
    []
  );

  const getWeeklySchedule = (week: Date[]) => {
    const idQueryByThisMonday =
      week[0].getFullYear().toString() +
      format(week[0], "MM").toString() +
      format(week[0], "dd").toString() +
      "000000";
    const idQueryByThisSunday =
      week[week.length - 1].getFullYear().toString() +
      format(week[week.length - 1], "MM").toString() +
      format(week[week.length - 1], "dd").toString() +
      +"115959";
    const filterQuery = `?id_gte=${idQueryByThisMonday}&id_lte=${idQueryByThisSunday}&_sort=id&_order=asc`;

    getSchedule<ScheduleType[]>(filterQuery).then((data) => {
      setWeeklySchedule(data);
      setIdFromWeeklySchedule(
        data.map((schedule: ScheduleType) => {
          return schedule.id;
        })
      );
    });
  };

  return {
    weeklySchedule,
    getWeeklySchedule,
  };
};

export default useWeeklySchedule;
