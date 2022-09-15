export type ScheduleType = {
  id: number; //용도: startTime으로 만든 숫자 데이터. get request시 날짜 기준, sorting 기준 (ex : 20220905090000) 
  startTime: string; //용도: 강의 시작 시간을 저장하는 용도(ex : "Mon Sep 05 2022 09:00:00 GMT+0900 (한국 표준시)")
  endTime: string; //용도: 강의 끝나는 시간을 저장하는 용도(ex :  "Mon Sep 05 2022 09:40:00 GMT+0900 (한국 표준시)")
  date: string; //용도: 시분초값 없이 강의가 있는 날짜만 떼어서 저장하는 용도(ex : "2022. 9. 5.")
};