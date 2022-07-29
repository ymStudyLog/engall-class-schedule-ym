import { atom, selector } from "recoil";
import { getDay, toDate, addDays } from "date-fns";

const getWeekStateSelector = selector({
  key: "getWeekStateSelector",
  get: () => {
    const now: Date = new Date();
    const day: number = getDay(now);
    const mondayMilliseconds: number = now.setDate(now.getDate() - (day - 1));
    const monday : Date = toDate(mondayMilliseconds);
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