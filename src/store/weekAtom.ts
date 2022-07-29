import { atom, selector } from "recoil";
import { getDay, toDate, addDays } from "date-fns";
import { scheduleService } from "../api/api";

const getWeekStateSelector = selector({
  key: "getWeekStateSelector",
  get: () => {
    const now: Date = new Date();
    const day: number = getDay(now);
    const mondayMilliseconds: number = now.setDate(now.getDate() - (day - 1));
    const monday: Date = toDate(mondayMilliseconds);
    return [
      monday,
      addDays(monday, 1),
      addDays(monday, 2),
      addDays(monday, 3),
      addDays(monday, 4),
      addDays(monday, 5),
      addDays(monday, 6),
    ];
  },
});

export const weekState = atom({
  key: "weekState",
  default: getWeekStateSelector,
});

const getScheduleSelector = selector({
  key: "getScheduleSelector",
  get: async ({ get }) => {
    const weekData = get(weekState);
    const requestUrlString = `?date_gte=${weekData[0].toLocaleDateString()}&date_lte=${weekData[
      weekData.length - 1
    ].toLocaleDateString()}`;
    const weekSchedule = await scheduleService
      .get(requestUrlString)
      .then((response) => {
        return response.data;
      });
    return weekSchedule;
  },
});

export const scheduleState = atom({
  key: "scheduleState",
  default: getScheduleSelector,
});
