import React from "react";
import { getScheduleByDate } from "../api/api";
import ScheduleBox from "./ScheduleBox";
import { ClassType } from "../types/ClassType";
import styled from "styled-components";

type Props = {
  date: string;
};

const DailySchedule = (props: Props) => {
  const { date } = props;
  const [classes, setClasses] = React.useState<ClassType[]>([]);

  React.useEffect(() => {
    getScheduleByDate<ClassType[]>(date).then((data) => setClasses(data));
  }, [date]);

  return (
    <ScheduleContainer>
      {classes.map((classTime: ClassType, index: number) => {
        const time = `${classTime.startTime} - ${classTime.endTime}`;
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