import { weekState, scheduleState } from "../store/weekAtom";
import { ScheduleType } from "../types/ScheduleType";
import { scheduleService } from "../api/api";
import { useRecoilState, useRecoilValue } from "recoil";

const useSchedule = () => {
  const week = useRecoilValue<Date[]>(weekState);
  const [schedule, setSchedule] = useRecoilState<ScheduleType[]>(scheduleState);

  const requestUrlString = `?date_gte=${week[0].toLocaleDateString()}&date_lte=${week[
    week.length - 1
  ].toLocaleDateString()}`;

  const getWeeklySchedule = () => {
    scheduleService.get(requestUrlString).then((response) => {
      setSchedule(response.data);
    });
  };

  return{
    schedule,  //TODO hooks 처리 = 위클리 스케줄, 아톰, 컨펌딜리트 모달
    getWeeklySchedule
  }
};

export default useSchedule;