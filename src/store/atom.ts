import { atom, selector } from "recoil";
import { getDay, toDate, addDays } from "date-fns";

const getWeekRangeState = selector({
  key: "getWeekRangeState",
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
  default: getWeekRangeState,
});

export const getUrlString = selector({
  key: "getUrlString",
  get: ({ get }) => {
    const weekData = get(weekState);
    const requestUrlString = `?date_gte=${weekData[0].toLocaleDateString()}&date_lte=${weekData[
      weekData.length - 1
    ].toLocaleDateString()}`;
    return requestUrlString;
  },
});

const getScheduleState = selector({
  key: "getScheduleState",
  get: async ({ get }) => {
    const url = get(getUrlString);
    const schedule = scheduleService.get(url).then((response) => {
      return response.data;
    });
    return schedule;
  },
});

export const scheduleState = atom({
  key: "scheduleState",
  default: getScheduleState,
});
