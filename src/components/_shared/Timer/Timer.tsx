import React, { useEffect, useState } from "react";
import moment from "moment";
import { Typography } from "@mui/material";

export const Timer: React.FC<{
  targetDate: string | Date | number;
}> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState("00:00:00");

  const updateTime = () => {
    const now = moment();
    const target = moment(targetDate);

    const diff = target.diff(now);
    if (diff <= 0) {
      setTimeLeft("00:00:00");
      return;
    }

    const duration = moment.duration(diff);

    const formatted =
      String(Math.floor(duration.asHours())).padStart(2, "0") +
      ":" +
      String(duration.minutes()).padStart(2, "0") +
      ":" +
      String(duration.seconds()).padStart(2, "0");

    setTimeLeft(formatted);
  };

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return <Typography variant={"body2"}>{timeLeft}</Typography>;
};
