import { areIntervalsOverlapping } from 'date-fns';

// start 시간 선택
// => am은 그냥 & pm선택시 +12
// 자동으로 end 시간 date-fns로 계산해서 "{ start : 시간, end : 시간 }" 으로 데이터 생성되게 만들기
// => db overlap 확인후 불가능한 요일 버튼 비활성화하기 = 연진

const trueOrFalse = areIntervalsOverlapping({ start: new Date(2014, 1, 10, 1, 0), end: new Date(2014, 1, 10, 1, 40) }, { start: new Date(2014, 1, 10, 1, 5), end: new Date(2014, 1, 10, 1, 45) });

console.log(trueOrFalse);

/* AddSchedule.tsx에서 안써서 옮겨둠 */
  // const isOverlapping: boolean[] = schedules.map((schedule) => {
  //   const bookedStartTime = new Date(schedule.startTime);
  //   console.log(bookedStartTime);

  //   const bookedEndTime = addMinutes(bookedStartTime, CLASS_DURATION);
  //   console.log(bookedEndTime);

  //   const trueOrFalse = areIntervalsOverlapping(
  //     { start: userStartTime, end: userEndTime },
  //     { start: bookedStartTime, end: bookedEndTime }
  //   );
  //   return trueOrFalse;
  // });
  // console.log(isOverlapping);

  // const handleClickRepeat = ()=>{

  /* for 문 돌려서 인덱스까지 뽑은 로직 부분 */
  //1. true 값이 나온 해당 인덱스를 뽑아서
  //2. 해당 index 값의 요일을 뽑고
  //3. 해당하는 요일의 버튼을 딜리트해준다

  // let newArr: number[] = [];
  // for (let i = 0; i < isOverlapping.length; i++) {
  //   if (isOverlapping[i] === true) {
  //     newArr.push(i);
  //   }
  // }

  // const testing: string[] = newArr.map((item) => {
  //   return schedules[item].day;
  // });

  // console.log("testing", testing);