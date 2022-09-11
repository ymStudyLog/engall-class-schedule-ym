import React from "react";
import { useRecoilValue } from "recoil";
import { addMinutes, sub, format } from "date-fns";
import { mondayToSunday, idFromWeeklySchedule } from "../store/atom";
import { TimeType } from "../types/TimeType";
import { ScheduleType } from "../types/ScheduleType";

type Props = {
  selectedTime: TimeType<string>;
};
const CLASS_DURATION: number = 40;

const getIdByDate = (date: Date): number => {
  const id = parseInt(
    date.getFullYear().toString() +
      format(date, "MM").toString() +
      format(date, "dd").toString() +
      format(date, "kk").toString() +
      format(date, "mm").toString() +
      "00"
  );
  return id;
};

//TODO 코드 순서 정리
const useOverlap = (props: Props) => {
  const { selectedTime } = props;
  console.log("useOverlap", selectedTime);
  const week = useRecoilValue<Date[]>(mondayToSunday);
  const weeklyScheduleId = useRecoilValue<number[]>(idFromWeeklySchedule);
  const [weeklyScheduleBySelectedTime, setWeeklyScheduleBySelectedTime] =
    React.useState<ScheduleType[]>([]);

  React.useEffect(() => {
    const scheduleArray = week.map((dayOfWeek: Date) => {
      const start: Date = new Date(
        dayOfWeek.getFullYear(),
        dayOfWeek.getMonth(),
        dayOfWeek.getDate()
        // parseInt(selectedTime.hour),
        // parseInt(selectedTime.minute)
      );
      // console.log(start);
      const end: Date = addMinutes(start, CLASS_DURATION);
      const id: number = getIdByDate(start);

      return {
        id: id,
        startTime: start.toString(),
        endTime: end.toString(),
        date: start.toLocaleDateString(),
      };
    });

    setWeeklyScheduleBySelectedTime(scheduleArray);
  }, [week, selectedTime]);

  const [overlapFilter, setOverlapFilter] = React.useState<number[][]>([]);
  React.useEffect(() => {
    const $overlapFilter: number[][] = weeklyScheduleBySelectedTime.map(
      (tempSchedule: ScheduleType) => {
        const _35minutesBeforeStartTime: Date = sub(
          new Date(tempSchedule.startTime),
          {
            minutes: CLASS_DURATION - 5,
          }
        );
        const idGreaterThan: number = getIdByDate(_35minutesBeforeStartTime);
        const _35minutesAfterStartTime: Date = addMinutes(
          new Date(tempSchedule.startTime),
          CLASS_DURATION - 5
        );
        const idLessThan: number = getIdByDate(_35minutesAfterStartTime);
        return [idGreaterThan, idLessThan];
      }
    );
    setOverlapFilter($overlapFilter);
  }, [weeklyScheduleBySelectedTime]);

  const [isOverlap, setIsOverlap] = React.useState<boolean[]>([]);
  const checkOverlap = (idArray: number[], filterArray: number[][]) => {
    const isOverlap: boolean[] = new Array(7).fill(false);
    for (let i = 0; i < idArray.length; i++) {
      for (let j = 0; j < filterArray.length; j++) {
        if (
          idArray[i] >= filterArray[j][0] &&
          idArray[i] <= filterArray[j][1]
        ) {
          isOverlap[j] = true;
          continue;
        }
      }
    }
    return isOverlap;
  };

  React.useEffect(() => {
    const result = checkOverlap(weeklyScheduleId, overlapFilter);
    setIsOverlap(result);
  }, [weeklyScheduleId, overlapFilter]);

  return {
    isOverlap,
    weeklyScheduleBySelectedTime,
  };
};

export default useOverlap;
