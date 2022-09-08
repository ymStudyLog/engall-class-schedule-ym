import { atom, selector } from "recoil";
import { getDay, toDate, addDays } from "date-fns";

const getMondayToSunday = selector({
  key: "getMondayToSunday",
  get: () => {
    const now: Date = new Date();
    const day: number = getDay(now);
    const mondayMilliseconds: number = now.setDate(
      day === 0 ? now.getDate() - 6 : now.getDate() - (day - 1)
    );
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

export const mondayToSunday = atom({
  key: "mondayToSunday",
  default: getMondayToSunday,
});

export const idFromWeeklySchedule = atom<number[]>({
  key: "idFromWeeklySchedule",
  default: [],
});
