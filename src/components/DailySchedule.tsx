import ScheduleBox from "./ScheduleBox";
import { ScheduleType } from "../types/ScheduleType";
import styled from "styled-components";

type Props = {
  dailyData: ScheduleType[];
};

const DailySchedule = (props: Props) => {
  const { dailyData } = props;

  return (
    <ScheduleContainer>
      {dailyData?.map((data: ScheduleType, index: number) => {
        const time = `${data.startTime} ${data.startTimeAMorPM}-${data.endTime}`;
        return <ScheduleBox key={index} time={time} id={data.id}/>;
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