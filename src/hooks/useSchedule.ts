import { getUrlString, scheduleState } from "../store/atom";
import { ScheduleType } from "../types/ScheduleType";
import { scheduleService } from "../api/api";
import { useRecoilState, useRecoilValue } from "recoil";

const useSchedule = () => {
  const url = useRecoilValue<string>(getUrlString);
  const [schedule, setSchedule] = useRecoilState<ScheduleType[]>(scheduleState);

  const getWeeklySchedule = () => {
    scheduleService.get(url).then((response) => {
      setSchedule(response.data);
    });
  };

  return{
    schedule,  //TODO hooks 처리 : WeeklySchedule(x)=>AddSchedule(ConfirmDeleteModal 참고), ConfirmDeleteModal
    getWeeklySchedule
  }
};

export default useSchedule;