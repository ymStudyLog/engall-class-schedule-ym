import React from "react";
import { useRecoilValue } from "recoil";
import { addMinutes, sub, format } from "date-fns";
import { mondayToSunday, idFromWeeklySchedule } from "../store/atom";
import { TimeType } from "../types/timeType";
import { ScheduleType } from "../types/scheduleType";

type Props = {
  selectedTime: TimeType<string>;
};
const CLASS_DURATION: number = 40;

const useOverlap = (props: Props) => {
  const { selectedTime } = props; 
  const weeklyScheduleId = useRecoilValue<number[]>(idFromWeeklySchedule);
  const week = useRecoilValue<Date[]>(mondayToSunday);
  const [weeklyScheduleBySelectedTime, setWeeklyScheduleBySelectedTime] =
    React.useState<ScheduleType[]>([]);

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

  React.useEffect(() => {
    const scheduleArray = week.map((dayOfWeek: Date) => {
      const start: Date = new Date(
        dayOfWeek.getFullYear(),
        dayOfWeek.getMonth(),
        dayOfWeek.getDate(),
        parseInt(selectedTime.hour),
        parseInt(selectedTime.minute)
      );
      const end: Date = addMinutes(start, CLASS_DURATION); //TODO 오후 12pm가 12로 저장되어야 되는데 00으로 저장되는 중 StartTime이랑 같이 수정하기
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

  //TODO 처음 렌더링시 필터 없게 수정하기!!! => selectedTime이 처음부터 넘어오기 때문에 아직 선택하지 않았음에도 값이 있음.
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
