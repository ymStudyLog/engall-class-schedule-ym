import React from "react";
import { getScheduleByDate } from "../api/api";
import ScheduleBox from "./ScheduleBox";
import { ScheduleType } from "../types/ScheduleType";
import styled from "styled-components";

type Props = {
  date: string;
};

const DailySchedule = (props: Props) => {
  const { date } = props;
  const [schedules, setSchedules] = React.useState<ScheduleType[]>([]);

  React.useEffect(() => {
    getScheduleByDate<ScheduleType[]>(date).then((data) => setSchedules(data));
  }, [date]);

  return (
    <ScheduleContainer>
      {schedules.map((classTime: ScheduleType, index: number) => {
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
  display: flex;
  flex-direction: column;
  gap:20px;
`;