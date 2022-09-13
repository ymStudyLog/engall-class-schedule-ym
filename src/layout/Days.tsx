import { format } from "date-fns";
import { useRecoilValue } from "recoil";
import { DayButton } from "./DayButton";
import { mondayToSunday } from "../store/atom";

const Days = () => {
  const week = useRecoilValue<Date[]>(mondayToSunday);
  return (
    <>
      {week.map((day: Date, index: number) => {
        return (
          <DayButton
            key={index}
            disabled
            isClicked={false}
            onClick={() => {
              console.log("");
            }}
          >
            {format(day, "EEEE")}
          </DayButton>
        );
      })}
    </>
  );
};

export default Days;
