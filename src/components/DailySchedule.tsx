import React from "react";
import { getScheduleByDate } from "../api/api";
import ScheduleBox from "./ScheduleBox";
import { ClassType } from "../types/ClassType";
import styled from "styled-components";

type Props = {
  date: string;
};

//TODO : 스케줄박스 사이사이 띄우기
const DailySchedule = (props: Props) => {
  const { date } = props;
  const [schedules, setSchedules] = React.useState<ClassType[]>([]);

  React.useEffect(() => {
    getScheduleByDate<ClassType[]>(date).then((data) => setSchedules(data));
  }, [date]);

  return (
    <ScheduleContainer>
      {schedules.map((classTime: ClassType, index: number) => {
        const time = `${classTime.startTime} ${classTime.startTimeAMorPM}-${classTime.endTime}`;
        return <ScheduleBox key={index} time={time} id={classTime.id}/>;
      })}
    </ScheduleContainer>
  );
};

export default DailySchedule;

const ScheduleContainer = styled.div`
  margin: 10px 0;
  padding: 10px;
`;