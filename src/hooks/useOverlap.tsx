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
  const { selectedTime } = props; //user가 선택한 시간
  const weeklyScheduleId = useRecoilValue<number[]>(idFromWeeklySchedule); //이번주 스케줄 id 모음
  const week = useRecoilValue<Date[]>(mondayToSunday); //이번주 월~일
  const [weeklyScheduleBySelectedTime, setWeeklyScheduleBySelectedTime] =
    React.useState<ScheduleType[]>([]); //selectedTime으로 만든 weeklySchedule

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

  //TODO 처음 렌더링시 필터 없게 수정하기!!! => selectedTime이 처음부터 넘어오기 때문에 아직 선택하지 않았음에도 값이 있음.
  const [overlapFilter, setOverlapFilter] = React.useState<number[][]>([]);
  React.useEffect(()=>{
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
  },[weeklyScheduleBySelectedTime]);

  // const [isOverlap, setIsOverlap] = React.useState<boolean[]>(
  //   new Array(7).fill(false)
  // );
  const checkOverlap = (idArray: number[], filterArray: number[][]) => {
    console.log("startTime으로 만든 filter",filterArray);
    const temp: boolean[] = new Array(7).fill(false);
    for (let i = 0; i < idArray.length; i++) {
      for (let j = 0; j < filterArray.length; j++) {
        if (
          idArray[i] >= filterArray[j][0] &&
          idArray[i] <= filterArray[j][1]
        ) {
          temp[j] = true;
          continue;
        }
      }
    }
    return temp;
  };

  React.useEffect(() => {
    const isOverlap = checkOverlap(weeklyScheduleId, overlapFilter);
    console.log("temp 밖에 나오면",isOverlap);
  }, [weeklyScheduleId, overlapFilter]);

  return {
    availableDay: [],
  };
};

export default useOverlap;
