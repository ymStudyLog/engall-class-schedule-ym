import styled from "styled-components";
import { format } from "date-fns";
import ScheduleBox from "./ScheduleBox";
import { ScheduleType } from "../../types/ScheduleType";

type Props = {
  dailyScheduleData: ScheduleType[];
};

const ScheduleByDay = (props: Props) => {
  const { dailyScheduleData } = props; 

  return (
    <ScheduleContainer>
      {dailyScheduleData?.map((data: ScheduleType, index: number) => {
        const start = format(new Date(data.startTime), "K:mm a");
        const end = format(new Date(data.endTime), "K:mm a");
        const time = `${start}-${end}`;
        return <ScheduleBox key={index} time={time} id={data.id} />;
      })}
    </ScheduleContainer>
  );
};

export default ScheduleByDay;

const ScheduleContainer = styled.div`
  margin: 10px 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
