import React from "react";
import { TimeType } from "../types/timeType";

type Props = {
  setTime: React.Dispatch<React.SetStateAction<TimeType<string>>>;
  time: TimeType<string>;
};

const useAmPm = (props: Props) => {
  const { setTime, time } = props;
  const [isClicked, setIsClicked] = React.useState({
    am: false,
    pm: false,
  });

  const handleAmClick = () => {
    if (parseInt(time.hour) >= 12) {
      setTime({
        ...time,
        hour: createTwoDigit(parseInt(time.hour) - 12),
      });
    }
    setIsClicked({ ...isClicked, am: true, pm: false });
  };

  const handlePmClick = () => {
    if (parseInt(time.hour) < 12) {
      setTime({
        ...time,
        hour: createTwoDigit(parseInt(time.hour) + 12),
      });
    }
    setIsClicked({ ...isClicked, am: false, pm: true });
  };

  const createTwoDigit = (number: number) => {
    if (number < 10) {
      return "0".concat(number.toString());
    } else {
      return number.toString();
    }
  };

  return { 
    isClicked, 
    handleAmClick, 
    handlePmClick,
    createTwoDigit
  };
};

export default useAmPm;
