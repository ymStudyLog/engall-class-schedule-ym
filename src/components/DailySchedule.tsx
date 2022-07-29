import ScheduleBox from "./ScheduleBox";
import { ScheduleType } from "../types/ScheduleType";
import styled from "styled-components";
import { format } from "date-fns";

type Props = {
  dailyData: ScheduleType[];
};

const DailySchedule = (props: Props) => {
  const { dailyData } = props;

  const sortedDailyData = dailyData.sort(function(a,b) {
    if(new Date(a.startTime) > new Date(b.startTime)){
      return 1;
    }
    if(new Date(a.startTime) < new Date(b.startTime)){
      return -1;
    }
    return 0;
  })

  return (
    <ScheduleContainer>
      {sortedDailyData?.map((data: ScheduleType, index: number) => {
        const start = format(new Date(data.startTime), "K:mm a");
        const end = format(new Date(data.endTime), "K:mm a");
        const time = `${start}-${end}`;
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
  gap: 20px;
`;
