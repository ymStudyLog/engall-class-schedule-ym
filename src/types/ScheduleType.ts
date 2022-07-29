export type ScheduleType = {
  id: number;
  startTime: Date | number | string;
  endTime: Date | number | string;
  startTimeAMorPM: string;
  endTimeAMorPM: string;
  date: string;
};
