import { useRecoilValue } from "recoil";
import { areIntervalsOverlapping, addMinutes, getTime } from "date-fns";
import { mondayToSunday, weeklySchedule } from "../store/atom";
import { TimeType } from "../types/timeType";
import { ScheduleType } from "../types/scheduleType";

type Props = {
  time: TimeType<string>;
};
const CLASS_DURATION = 40;

const useOverlap = (props: Props) => {
  const { time } = props;
  const week = useRecoilValue<Date[]>(mondayToSunday);
  const realSchedule = useRecoilValue<ScheduleType[]>(weeklySchedule); //readOnly
  const sorted = [...realSchedule].sort(function (a, b) {
    return getTime(new Date(a.startTime)) - getTime(new Date(b.startTime));
  });
  console.log("sorted :", sorted);
  const temp = week.map((i)=>{return i.toLocaleDateString();}).map((i)=>{
     
  })
  console.log("sorted :", );

  const fakeSchedule = week.map((dayOfWeek: Date) => {
    const start = new Date(
      dayOfWeek.getFullYear(),
      dayOfWeek.getMonth(),
      dayOfWeek.getDate(),
      parseInt(time.hour),
      parseInt(time.minute)
    );
    const end = addMinutes(start, CLASS_DURATION);

    return {
      startTime: start.toString(),
      endTime: end.toString(),
      date: dayOfWeek.toLocaleDateString(),
    };
  });
  // console.log("fake sorted : ", fakeSchedule);

  // const trueOrFalse = areIntervalsOverlapping(
  //   { start: new Date(2014, 1, 10, 1, 0), end: new Date(2014, 1, 10, 1, 40) },
  //   { start: new Date(2014, 1, 10, 1, 5), end: new Date(2014, 1, 10, 1, 45) }
  // );
  // console.log(trueOrFalse); //겹치면 true
  // const trueOrFalse2 = areIntervalsOverlapping(
  //   { start: new Date(2014, 1, 10, 1, 0), end: new Date(2014, 1, 10, 1, 40) },
  //   { start: new Date(2014, 1, 10, 1, 50), end: new Date(2014, 1, 10, 2, 30) }
  // );
  // console.log(trueOrFalse2); //안겹치면 false

  const trueOrFalse = fakeSchedule.map(
    (schedule: { startTime: string; endTime: string }) => {
    }
  ); //새로 생성 예정인 fake 스케줄이 overlap에 걸리는지 확인해야하기 때문에 fake로 mapping -> real스케줄과 날짜가 같을 경우에만 비교하기 아니면 false(안겹치니까)

  // console.log("trueOrFalse", trueOrFalse);
  return {
    fakeSchedule,
  };
};

export default useOverlap;
