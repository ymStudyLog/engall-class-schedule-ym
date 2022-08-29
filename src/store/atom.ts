import { atom, selector } from 'recoil';
import { getDay, toDate, addDays } from 'date-fns';

const getMondayToSunday = selector({
  key: 'getMondayToSunday',
  get: () => {
    const now: Date = new Date();
    const day: number = getDay(now);
    const mondayMilliseconds: number = now.setDate(day === 0 ? now.getDate()-6 : now.getDate()-(day - 1));
    const monday: Date = toDate(mondayMilliseconds);
    return [monday, addDays(monday, 1), addDays(monday, 2), addDays(monday, 3), addDays(monday, 4), addDays(monday, 5), addDays(monday, 6)];
  },
});

export const mondayToSunday = atom({
  key: 'mondayToSunday',
  default: getMondayToSunday,
});

// export const getQueryString = selector({ //이거는 그냥 커스텀 훅으로 전환하기
//   key: 'getQueryString',
//   get: ({ get }) => {
//     const weekData = get(mondayToSunday);
//     const query = `?date_gte=${weekData[0].toLocaleDateString()}&date_lte=${weekData[weekData.length - 1].toLocaleDateString()}`;
//     return query;
//   },
// });

// const getScheduleState = selector({
//   key: 'getScheduleState',
//   get: async ({ get }) => {
//     const url = get(getQueryString);
//     const schedule = scheduleService.get(url).then((response) => {
//       return response.data;
//     });
//     return schedule;
//   },
// });

// export const scheduleState = atom({
//   key: 'scheduleState',
//   default: getScheduleState,
// });
