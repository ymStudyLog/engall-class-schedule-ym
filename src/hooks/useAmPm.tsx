import React from "react";
import { TimeType } from "../types/TimeType";

type Props = {
  setSelectedTime: React.Dispatch<React.SetStateAction<TimeType<string>>>;
};

const useAmPm = (props: Props) => {
  const { setSelectedTime } = props;
  const [isClicked, setIsClicked] = React.useState({
    am: false,
    pm: false,
  });

  const handleAmClick = (time: TimeType<string>) => {
    if (parseInt(time.hour) >= 12) {
      setSelectedTime({
        ...time,
        hour: createTwoDigit(parseInt(time.hour) - 12),
      });
    }
    setIsClicked({ ...isClicked, am: true, pm: false });
  };

  const handlePmClick = (time: TimeType<string>) => {
    if (parseInt(time.hour) < 12) {
      setSelectedTime({
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
    createTwoDigit,
  };
};

export default useAmPm;
